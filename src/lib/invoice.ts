import type { Booking } from "@/lib/types";

export async function downloadInvoice(
  b: Booking,
  userName: string,
  userEmail: string,
) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF();

  const invoiceNo = `SS-${b._id.slice(-8).toUpperCase()}`;
  const issued = new Date().toISOString().split("T")[0];
  const total = b.totalPrice + b.securityDeposit;

  // Header
  doc.setFillColor(79, 70, 229);
  doc.rect(0, 0, 210, 32, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("StudioSpace", 14, 20);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Booking Invoice", 196, 20, { align: "right" });

  // Meta
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(10);
  doc.text(`Invoice no: ${invoiceNo}`, 14, 46);
  doc.text(`Issued: ${issued}`, 14, 53);
  doc.text(`Status: ${b.status}`, 14, 60);

  doc.setFont("helvetica", "bold");
  doc.text("Billed to", 120, 46);
  doc.setFont("helvetica", "normal");
  doc.text(userName, 120, 53);
  doc.text(userEmail, 120, 60);

  // Booking details
  doc.setDrawColor(203, 213, 225);
  doc.line(14, 70, 196, 70);
  doc.setFont("helvetica", "bold");
  doc.text("Booking details", 14, 80);
  doc.setFont("helvetica", "normal");
  doc.text(`Studio: ${b.studioTitle}`, 14, 89);
  doc.text(`Location: ${b.studioLocation}`, 14, 96);
  doc.text(`Date: ${b.date}`, 14, 103);
  doc.text(`Time: ${b.startTime} - ${b.endTime} (${b.hours} hr)`, 14, 110);

  // Charges
  doc.line(14, 120, 196, 120);
  doc.setFont("helvetica", "bold");
  doc.text("Description", 14, 129);
  doc.text("Amount", 196, 129, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.text(`Studio rental (${b.hours} hr)`, 14, 138);
  doc.text(`$${b.totalPrice.toFixed(2)}`, 196, 138, { align: "right" });
  doc.text("Security deposit (refundable)", 14, 146);
  doc.text(`$${b.securityDeposit.toFixed(2)}`, 196, 146, { align: "right" });

  doc.line(14, 154, 196, 154);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Total", 14, 164);
  doc.text(`$${total.toFixed(2)}`, 196, 164, { align: "right" });

  // Footer
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text("Thank you for booking with StudioSpace.", 105, 280, {
    align: "center",
  });

  doc.save(`StudioSpace-Invoice-${invoiceNo}.pdf`);
}
