# AutoNexus Command Lab

Interactive Layer 1 virtual proof of concept for the AutoNexus project.

## Features

- Light-theme responsive dashboard and fullscreen presentation mode.
- Two-second source verification presentation sequence.
- Recorded synthetic CAN_H/CAN_L waveform replay.
- Interactive region selection, zoom and differential voltage comparison.
- Descriptive waveform measurements and explicit source-match rule rationale.
- MATLAB prediction CSV import for recorded model-output replay.
- User-reported test accuracy, precision, recall and confusion matrices.

## Run locally

From the repository folder, run:

```sh
python3 -m http.server 8000
```

Open http://localhost:8000 in a browser. Serve over HTTP because the app fetches
waves.json. No build step or package installation is required.

## Files

- index.html: dashboard structure and reported test evidence.
- style.css: light theme and responsive layouts.
- app.js: interaction, plots, prediction import and source-rule demonstration.
- analysis.js: descriptive waveform measurement functions.
- waves.json: 16 windows per condition, from the synthetic test datasets.

## Model results

Select the matching signal condition and import either
`autonexus_fresh_test_predictions.csv` or
`autonexus_noise_stress_predictions.csv`, produced by test_autonexus_csv.m.
Files are parsed locally in the browser. The app expects 1,000 labelled
prediction rows and can replay the 16 waveform windows included per condition.
The trained MATLAB model and full datasets are not included in this repository.

## Demonstration limits

Without imported predictions, output is scenario-rule simulation. The site
does not run live CNN inference. Cellular/rogue base station names are scenario
labels for CAN profiles A/B, not RF base-station identification. A source match
passes only the source check, not command permission or vehicle-context checks.
The two-second delay is for presentation, not measured inference latency.
Waveform measurements are descriptive and do not establish CNN attribution.
The 99.00% and 94.70% test accuracies are user-reported synthetic MATLAB results.

Google Fonts supplies optional typefaces; system fonts are fallbacks.
