import type { Booking } from "@/lib/types";

// নিরাপদ ফিল্ড রেজোলিউশনের জন্য এক্সটেন্ডেড টাইপ
type SafeBooking = Booking & {
  bookingDate?: string;
  totalCost?: number;
  totalHours?: number;
  location?: string;
};

export async function downloadInvoice(
  b: SafeBooking,
  userName: string,
  userEmail: string,
) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const invoiceNo = `SS-${(b._id ? b._id.slice(-8) : "00000000").toUpperCase()}`;
  const issued = new Date().toISOString().split("T")[0];

  // নিরাপদ ডাটা রেজোলিউশন (NaN ও ক্র্যাশ প্রতিরোধ)
  const rentalPrice = Number(b.totalPrice ?? b.totalCost ?? 0);
  const securityDeposit = Number(b.securityDeposit ?? 0);
  const total = rentalPrice + securityDeposit;
  const bookingDate = b.date || b.bookingDate || "Scheduled Date";
  const studioLocation =
    b.studioLocation || b.location || "StudioSpace Partner Loft";
  const hours = b.hours ?? b.totalHours ?? 1;
  const timeSlot = `${b.startTime || "10:00"} – ${b.endTime || "14:00"}`;

  // 1. Brand Header Banner (StudioSpace Indigo)
  doc.setFillColor(79, 70, 229); // #4F46E5
  doc.rect(0, 0, 210, 36, "F");

  // Logo & Platform Name
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("StudioSpace", 14, 22);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("Creative Production & Stage Booking", 14, 28);

  // Invoice Header Title
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("OFFICIAL RECEIPT", 196, 20, { align: "right" });
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(`Generated: ${issued}`, 196, 26, { align: "right" });

  // 2. Invoice Meta & Client "Billed To" Info Card
  doc.setFillColor(248, 250, 252); // #F8FAFC
  doc.roundedRect(14, 44, 182, 30, 3, 3, "F");
  doc.setDrawColor(226, 232, 240); // #E2E8F0
  doc.roundedRect(14, 44, 182, 30, 3, 3, "S");

  // Left Meta Column
  doc.setTextColor(100, 116, 139);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("INVOICE NUMBER", 20, 52);
  doc.text("STATUS", 20, 64);

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text(invoiceNo, 20, 58);

  doc.setFontSize(9);
  if (b.status === "Confirmed" || b.status === "Completed") {
    doc.setTextColor(16, 185, 129); // Green
  } else if (b.status === "Pending") {
    doc.setTextColor(217, 119, 6); // Amber
  } else {
    doc.setTextColor(225, 29, 72); // Rose
  }
  doc.text(b.status ? b.status.toUpperCase() : "CONFIRMED", 20, 70);

  // Right Client Info Column
  doc.setTextColor(100, 116, 139);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("BILLED TO CREATOR", 110, 52);

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(10);
  doc.text(userName || "Verified Creator", 110, 58);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.text(userEmail || "creator@studiospace.io", 110, 65);

  // 3. Studio Stage & Booking Details
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Production Booking Details", 14, 86);

  doc.setDrawColor(226, 232, 240);
  doc.line(14, 90, 196, 90);

  const detailStartY = 98;
  const lineHeight = 7;

  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(100, 116, 139);
  doc.text("Studio Stage:", 14, detailStartY);
  doc.text("Location / Set:", 14, detailStartY + lineHeight);
  doc.text("Production Date:", 14, detailStartY + lineHeight * 2);
  doc.text("Reserved Slot:", 14, detailStartY + lineHeight * 3);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(15, 23, 42);
  doc.text(b.studioTitle || "Creative Stage Workspace", 52, detailStartY);
  doc.text(studioLocation, 52, detailStartY + lineHeight);
  doc.text(bookingDate, 52, detailStartY + lineHeight * 2);
  doc.text(
    `${timeSlot} (${hours} hr session)`,
    52,
    detailStartY + lineHeight * 3,
  );

  // 4. Financial Line Items Table
  const tableTopY = 134;

  // Table Header Box
  doc.setFillColor(241, 245, 249); // #F1F5F9
  doc.rect(14, tableTopY, 182, 8, "F");

  doc.setTextColor(71, 85, 105);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("ITEM DESCRIPTION", 18, tableTopY + 5.5);
  doc.text("HOURS / QTY", 120, tableTopY + 5.5);
  doc.text("TOTAL AMOUNT", 192, tableTopY + 5.5, { align: "right" });

  // Row 1: Studio Rental
  const row1Y = tableTopY + 16;
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(
    `Studio Space Rental (${b.studioTitle || "Stage Access"})`,
    18,
    row1Y,
  );
  doc.text(`${hours} hrs`, 120, row1Y);
  doc.setFont("helvetica", "bold");
  doc.text(`$${rentalPrice.toFixed(2)}`, 192, row1Y, { align: "right" });

  // Row 2: Security Deposit
  const row2Y = row1Y + 9;
  doc.setFont("helvetica", "normal");
  doc.text("Refundable Escrow Security Deposit", 18, row2Y);
  doc.text("1 unit", 120, row2Y);
  doc.setFont("helvetica", "bold");
  doc.text(`$${securityDeposit.toFixed(2)}`, 192, row2Y, { align: "right" });

  // Divider Line
  doc.setDrawColor(226, 232, 240);
  doc.line(14, row2Y + 6, 196, row2Y + 6);

  // Row 3: Grand Total
  const totalY = row2Y + 15;
  doc.setTextColor(79, 70, 229);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Total Paid / Due", 120, totalY);
  doc.text(`$${total.toFixed(2)} USD`, 192, totalY, { align: "right" });

  // 5. Host Guarantee Notice Box
  const noticeY = 180;
  doc.setFillColor(238, 242, 255); // #EEF2FF
  doc.roundedRect(14, noticeY, 182, 20, 2, 2, "F");
  doc.setTextColor(67, 56, 202); // #4338CA
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "bold");
  doc.text(
    "Covered by the StudioSpace Host Guarantee & Protection",
    20,
    noticeY + 8,
  );
  doc.setFont("helvetica", "normal");
  doc.setTextColor(79, 70, 229);
  doc.setFontSize(8);
  doc.text(
    "Security deposits are held securely in escrow and released post-wrap upon inspection[cite: 1, 4].",
    20,
    noticeY + 14,
  );

  // 6. Footer Legal & Thank You
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(148, 163, 184);
  doc.text(
    "Thank you for choosing StudioSpace for your creative production.",
    105,
    275,
    {
      align: "center",
    },
  );
  doc.text(
    "StudioSpace Inc. • Verified Peer-to-Peer Production Marketplace • support@studiospace.io[cite: 3]",
    105,
    280,
    { align: "center" },
  );

  doc.save(`StudioSpace-Invoice-${invoiceNo}.pdf`);
}
