module fa(
  input logic a,
  input logic b,
  input logic ci,
  output logic s,
  output logic co
);
  assign s = a ^ b ^ ci;
  assign co = (a & b) | (a & ci) | (b & ci);
endmodule

module fa4(
  input logic [3:0] a,
  input logic [3:0] b,
  input logic ci,
  output logic [3:0] s,
  output logic co
);
  logic c1, c2, c3;

  fa f0 (.a(a[0]), .b(b[0]), .ci(ci), .s(s[0]), .co(c1));
  fa f1 (.a(a[1]), .b(b[1]), .ci(c1), .s(s[1]), .co(c2));
  fa f2 (.a(a[2]), .b(b[2]), .ci(c2), .s(s[2]), .co(c3));
  fa f3 (.a(a[3]), .b(b[3]), .ci(c3), .s(s[3]), .co(co));

endmodule

module bcdadd1(
  input logic [3:0] a,
  input logic [3:0] b,
  input logic ci,
  output logic [3:0] s,
  output logic co
);
  logic [3:0] sum0;
  logic c0;
  logic fix;
  logic [3:0] corr;

  fa4 u0 (.a(a), .b(b), .ci(ci), .s(sum0), .co(c0));

  assign fix = c0 | (sum0 > 4'd9);
  assign corr = fix ? 4'b0110 : 4'b0000;

  fa4 u1 (.a(sum0), .b(corr), .ci(1'b0), .s(s), .co());

  assign co = fix;

endmodule

module bcdadd4(
  input logic [15:0] a,
  input logic [15:0] b,
  input logic ci,
  output logic [15:0] s,
  output logic co
);
  logic c1, c2, c3;

  bcdadd1 d0 (.a(a[3:0]),    .b(b[3:0]),    .ci(ci), .s(s[3:0]),    .co(c1));
  bcdadd1 d1 (.a(a[7:4]),    .b(b[7:4]),    .ci(c1), .s(s[7:4]),    .co(c2));
  bcdadd1 d2 (.a(a[11:8]),   .b(b[11:8]),   .ci(c2), .s(s[11:8]),   .co(c3));
  bcdadd1 d3 (.a(a[15:12]),  .b(b[15:12]),  .ci(c3), .s(s[15:12]),  .co(co));

endmodule

module bcd9comp1(
  input logic [3:0] in,
  output logic [3:0] out
);
  always_comb begin
    case (in)
      4'd0: out = 4'd9;
      4'd1: out = 4'd8;
      4'd2: out = 4'd7;
      4'd3: out = 4'd6;
      4'd4: out = 4'd5;
      4'd5: out = 4'd4;
      4'd6: out = 4'd3;
      4'd7: out = 4'd2;
      4'd8: out = 4'd1;
      4'd9: out = 4'd0;
      default: out = 4'd0;
    endcase
  end
endmodule

module bcdaddsub4(
  input logic [15:0] a,
  input logic [15:0] b,
  input logic op,
  output logic [15:0] s
);
  logic [15:0] bcomp;
  logic [15:0] bsel;

  bcd9comp1 c0 (.in(b[3:0]),    .out(bcomp[3:0]));
  bcd9comp1 c1 (.in(b[7:4]),    .out(bcomp[7:4]));
  bcd9comp1 c2 (.in(b[11:8]),   .out(bcomp[11:8]));
  bcd9comp1 c3 (.in(b[15:12]),  .out(bcomp[15:12]));

  assign bsel = op ? bcomp : b;

  bcdadd4 u0 (.a(a), .b(bsel), .ci(op), .s(s), .co());

endmodule