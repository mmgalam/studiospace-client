import HowBookingWorks from "@/components/HowBookingWorks";
import HostGuarantee from "@/components/HostGuarantee";

export const metadata = { title: "How It Works | StudioSpace" };

const faqs = [
  {
    q: "How do I book a studio?",
    a: "Open a studio, choose a date and time range, and send your request. The host confirms it and the status updates in My Bookings.",
  },
  {
    q: "Can I cancel a booking?",
    a: "Yes, while it is still Pending you can cancel it from My Bookings. Confirmed bookings are managed with the host.",
  },
  {
    q: "What is the security deposit?",
    a: "A refundable amount set by the host to protect equipment. It is shown clearly before you confirm.",
  },
  {
    q: "How do I list my own studio?",
    a: "Log in, choose Add New Studio, fill in the details and upload a photo. Manage it anytime from My Studio Listings.",
  },
  {
    q: "What happens if the time is already taken?",
    a: "If a confirmed booking overlaps your slot, we show a clear message so you can pick another time.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <HowBookingWorks />
      <HostGuarantee />

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
        <div className="mt-8 space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5"
            >
              <summary className="cursor-pointer font-medium">{f.q}</summary>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
