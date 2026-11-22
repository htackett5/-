# FPGA Lunar Lander — SystemVerilog source

This collection contains the provided source files for the Lunar Lander FPGA design and its BCD arithmetic lab notebook.

## Design structure

- `lunarlander.sv`: top-level integration, button input and slower game clock
- `ll_memory.sv`: register storage for altitude, velocity, fuel, and thrust
- `ll_alu.sv`: BCD game-state updates using gravity and thrust
- `ll_control.sv`: landing/crash flags and memory write-enable
- `ll_display.sv`: seven-segment outputs and landing/crash LEDs
- `bcd_arithmetic.sv`: ripple-carry binary full adders, BCD adders, nine's complement, and BCD add/subtract
- `lab10-bcd-arithmetic.ipynb`: original lab instructions for the arithmetic foundation

## Important build note

The uploaded `lunarlander.sv` also instantiates `clock_psc` and `keysync`, and `ll_display.sv` instantiates `ssdec`. Source files defining these modules were not among the uploads. As supplied, this collection is **not a complete standalone synthesis project** without those additional modules and any board-specific constraints. The code is provided for design review and portfolio documentation, not as a verified one-command build.
