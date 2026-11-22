module ll_display (
  input logic clk,
  input logic rst,
  input logic land,
  input logic crash,
  input logic [3:0] disp_ctrl,
  input logic [15:0] alt,
  input logic [15:0] vel,
  input logic [15:0] fuel,
  input logic [15:0] thrust,
  output logic [7:0] ss7,
  output logic [7:0] ss6,
  output logic [7:0] ss5,
  output logic [7:0] ss3,
  output logic [7:0] ss2,
  output logic [7:0] ss1,
  output logic [7:0] ss0,
  output logic red,
  output logic green
);

  logic [3:0] mode;
  logic [15:0] num;
  logic [15:0] vel_mag;
  logic neg_vel;

  logic [6:0] seg0;
  logic [6:0] seg1;
  logic [6:0] seg2;
  logic [6:0] seg3;

  bcdaddsub4 uabs (.a(16'h0000), .b(vel), .op(1'b1), .s(vel_mag));

  always_ff @(posedge clk or posedge rst) begin
    if (rst)
      mode <= 4'b1000;
    else if (disp_ctrl != 4'b0000)
      mode <= disp_ctrl;
  end

  always_comb begin
    neg_vel = 1'b0;
    num = alt;
    {ss7, ss6, ss5} = 24'b01110111_00111000_01111000;

    case (mode)
      4'b1000: begin
        num = alt;
        {ss7, ss6, ss5} = 24'b01110111_00111000_01111000;
      end
      4'b0100: begin
        neg_vel = (vel[15:12] == 4'd9);
        num = neg_vel ? vel_mag : vel;
        {ss7, ss6, ss5} = 24'b00111110_01111001_00111000;
      end
      4'b0010: begin
        num = fuel;
        {ss7, ss6, ss5} = 24'b01101111_01110111_01101101;
      end
      4'b0001: begin
        num = thrust;
        {ss7, ss6, ss5} = 24'b01111000_01110110_01010000;
      end
      default: begin
        num = alt;
        {ss7, ss6, ss5} = 24'b01110111_00111000_01111000;
      end
    endcase
  end

  ssdec d0 (.in(num[3:0]),   .enable(1'b1),        .out(seg0));
  ssdec d1 (.in(num[7:4]),   .enable(|num[15:4]),  .out(seg1));
  ssdec d2 (.in(num[11:8]),  .enable(|num[15:8]),  .out(seg2));
  ssdec d3 (.in(num[15:12]), .enable(|num[15:12]), .out(seg3));

  assign ss0 = {1'b0, seg0};
  assign ss1 = {1'b0, seg1};
  assign ss2 = {1'b0, seg2};
  assign ss3 = neg_vel ? 8'b01000000 : {1'b0, seg3};

  assign red = rst ? 1'b0 : crash;
  assign green = rst ? 1'b0 : land;

endmodule