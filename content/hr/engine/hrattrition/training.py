"""Time-separated candidate selection, untouched future evaluation, frozen inference.

Input is a JSON manifest of historical snapshot files. All preprocessing is fit
inside training only. Validation chooses a candidate; test never chooses it.
The deployed bundle is that exact evaluated model, not a post-test refit.
"""
import hashlib
import json
from pathlib import Path
import numpy as np
import pandas as pd
from . import __version__
from .data import load_any
from .features import ALLOWED_FEATURES, FEATURE_DOCS, build_features, numeric_matrix
from .labels import load_labels
from .precheck import precheck, blocking
from .model import ScoreResult, policy_dict

CORE = ('tenure_years', 'grade_level', 'base_annual_krw10k', 'band_position',
        'months_since_raise', 'last_raise_pct', 'last_rating_score', 'rating_trend', 'ot_hours_m6', 'ot_trend')
SCHEMA = 'hr-frozen-model/1'


def metrics_at_k(y, scores, k):
    from sklearn.metrics import roc_auc_score, average_precision_score, brier_score_loss
    y, scores = np.asarray(y, int), np.asarray(scores, float)
    if int(k) <= 0:
        raise ValueError("K는 양수여야 합니다.")
    if len(y) == 0:
        raise ValueError('평가 표본이 없습니다.')
    actual_k = min(int(k), len(y))
    order = np.argsort(-scores, kind='stable')[:actual_k]
    hits, positives = int(y[order].sum()), int(y.sum())
    base = float(y.mean())
    bins = []
    for lo in np.arange(0, 1, .2):
        mask = (scores >= lo) & (scores < lo+.2 if lo < .8 else scores <= 1)
        if mask.any():
            bins.append(dict(n=int(mask.sum()), predicted=float(scores[mask].mean()), observed=float(y[mask].mean())))
    return dict(n=len(y), positives=positives, requested_k=int(k), k=actual_k, hits=hits,
                precision_at_k=hits/actual_k, recall_at_k=hits/positives if positives else None,
                lift_at_k=(hits/actual_k)/base if base else None, base_rate=base,
                roc_auc=float(roc_auc_score(y, scores)) if 0<positives<len(y) else None,
                average_precision=float(average_precision_score(y, scores)) if positives else None,
                brier=float(brier_score_loss(y, scores)), calibration_bins=bins)


def evaluate_periods(frame, scores, k):
    rows = []
    for date, g in frame.assign(prediction=scores).groupby('snapshot_date', sort=True):
        # Stable employee ordering breaks ties reproducibly.
        g = g.sort_values('employee_id', kind='stable')
        rows.append(dict(as_of=str(date.date()), **metrics_at_k(g.label, g.prediction, k)))
    precision = float(np.mean([r['precision_at_k'] for r in rows]))
    recall = [r['recall_at_k'] for r in rows if r['recall_at_k'] is not None]
    lift = [r['lift_at_k'] for r in rows if r['lift_at_k'] is not None]
    return dict(periods=rows, mean_precision_at_k=precision,
                mean_recall_at_k=float(np.mean(recall)) if recall else None,
                mean_lift_at_k=float(np.mean(lift)) if lift else None,
                pooled=metrics_at_k(frame.label, scores, k))
