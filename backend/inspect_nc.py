"""
inspect_nc.py
--------------
Run this once, directly, to find out exactly what shape your real
NetCDF file is in. Don't guess — this tells you for certain.

Usage:
    python inspect_nc.py
"""

import xarray as xr

FILENAME = "data/Tmax_and_Tmin_2018_24hr.nc"   # adjust path if needed

ds = xr.open_dataset(FILENAME)

print("=" * 50)
print("VARIABLES")
print("=" * 50)
for name, var in ds.data_vars.items():
    print(f"  {name}: dims={var.dims}, shape={var.shape}")

print("\n" + "=" * 50)
print("DIMENSIONS")
print("=" * 50)
for name, size in ds.dims.items():
    print(f"  {name}: size={size}")

print("\n" + "=" * 50)
print("COORDINATES")
print("=" * 50)
for name, coord in ds.coords.items():
    print(f"  {name}: {coord.values[:5]}{'...' if coord.size > 5 else ''}")

# The key question: is there a dimension like 'lead_time' / 'step' / 'forecast_day'
# alongside 'time'? If yes -> you have Day1-Day5 style multi-lead-time forecasts.
# If the only time-like dimension is 'time' (one value per date) -> you have a
# plain daily series, and "Day1 vs Day5 bias" would need to come from a
# DIFFERENT source (e.g. separate files per lead time) rather than this one file.
dim_names = list(ds.dims.keys())
lead_like = [d for d in dim_names if d.lower() in
             ("lead_time", "step", "forecast_day", "lead", "fcst_day")]
print("\n" + "=" * 50)
if lead_like:
    print(f"LOOKS LIKE MULTI-LEAD-TIME DATA. Lead dimension(s): {lead_like}")
else:
    print("LOOKS LIKE ONE VALUE PER DATE (no separate lead-time dimension found).")
print("=" * 50)
