#!/usr/bin/env bash
# Vercel build entry point. Installs the two Python packages the site needs and runs build.py.
# Works whether or not the build machine already has a usable Python.
set -euo pipefail
cd "$(dirname "$0")"

if command -v python3 >/dev/null 2>&1 && python3 -m venv .venv >/dev/null 2>&1; then
  echo "Building with system $(python3 --version)"
  .venv/bin/python -m pip install --quiet --disable-pip-version-check -r requirements.txt
  .venv/bin/python build.py
else
  echo "No usable Python found; installing uv to provide one"
  curl -LsSf https://astral.sh/uv/install.sh | sh
  export PATH="$HOME/.local/bin:$HOME/.cargo/bin:$PATH"
  uv run --python 3.12 --no-project --with-requirements requirements.txt python build.py
fi
