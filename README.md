# Goldline Tools — Prop Lot Size

Mobile-first Persian position sizing calculator, with animated Goldline risk dashboard and locally embedded MT5 symbol data.

## GitHub Pages
Published from branch `main`, repository root.

## iPhone installation
Open the HTTPS Pages URL in Safari, then Share → Add to Home Screen. The app uses a service worker for the offline shell and refreshes to the latest HTML when online.

## Risk calculation notes
- Uses contract specifications from the MT5 CSV snapshot dated 14 October 2026; these are not live tick values.
- Stop distance is rounded up to whole ticks and lot size down to broker volume steps.
- Commission, slippage and changing conversion values are not included.
- LTCUSD.x SELL remains disabled because that direction was not verified in the exporter output.
- Verify against MT5 or demo before live use.
