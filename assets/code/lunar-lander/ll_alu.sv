module ll_alu #(
  parameter GRAVITY=16'h0005
)(
  input logic [15:0] alt,
  input logic [15:0] vel,
  input logic [15:0] fuel,
  input logic [15:0] thrust,
  output logic [15:0] alt_n,
  output logic [15:0] vel_n,
  output logic [15:0] fuel_n
);

  logic [15:0] alt_c;
  logic [15:0] vel_c0;
  logic [15:0] vel_c;
  logic [15:0] fuel_c;
  logic [15:0] thrust_eff;

  assign thrust_eff = (fuel == 16'h0000) ? 16'h0000 : thrust;

  bcdaddsub4 u0 (.a(alt),    .b(vel),        .op(1'b0), .s(alt_c));
  bcdaddsub4 u1 (.a(vel),    .b(GRAVITY),    .op(1'b1), .s(vel_c0));
  bcdaddsub4 u2 (.a(vel_c0), .b(thrust_eff), .op(1'b0), .s(vel_c));
  bcdaddsub4 u3 (.a(fuel),   .b(thrust),     .op(1'b1), .s(fuel_c));

  always_comb begin
    if ((alt_c[15:12] == 4'd9) || (alt_c == 16'h0000)) begin
      alt_n = 16'h0000;
      vel_n = 16'h0000;
    end else begin
      alt_n = alt_c;
      vel_n = vel_c;
    end

    if ((fuel_c[15:12] == 4'd9) || (fuel_c == 16'h0000))
      fuel_n = 16'h0000;
    else
      fuel_n = fuel_c;
  end

endmodule