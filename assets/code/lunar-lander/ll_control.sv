module ll_control (
  input logic clk,
  input logic rst,
  input logic [15:0] alt,
  input logic [15:0] vel,
  output logic land,
  output logic crash,
  output logic wen
);

  logic [15:0] alt_vel;

  bcdaddsub4 u0 (.a(alt), .b(vel), .op(1'b0), .s(alt_vel));

  always_ff @(posedge clk or posedge rst) begin
    if (rst) begin
      land <= 1'b0;
      crash <= 1'b0;
      wen <= 1'b0;
    end else if ((alt_vel[15:12] == 4'd9) || (alt_vel == 16'h0000)) begin
      wen <= 1'b0;
      if (vel < 16'h9970) begin
        crash <= 1'b1;
        land <= 1'b0;
      end else begin
        crash <= 1'b0;
        land <= 1'b1;
      end
    end else begin
      land <= 1'b0;
      crash <= 1'b0;
      wen <= 1'b1;
    end
  end

endmodule