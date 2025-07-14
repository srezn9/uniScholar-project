
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "How do I apply for a scholarship?",
    answer:
      "First, log in to your account, then go to the scholarship details page and click on the Apply button after payment.",
  },
  {
    question: "Do I need to pay anything to apply?",
    answer:
      "Yes, each scholarship has an application fee and a service charge. Both will be shown clearly before you apply.",
  },
  {
    question: "Who verifies the scholarships?",
    answer:
      "All scholarships are reviewed and approved by our moderator and admin team to ensure accuracy and trustworthiness.",
  },
  {
    question: "Can I cancel or edit my application?",
    answer:
      "You can cancel anytime. Editing is allowed only if your application status is still marked as 'Pending'.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-[#FAF9F6] py-16 px-4 md:px-8 lg:px-20 text-[#2D2A32]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-slate-300 rounded-xl bg-white shadow-sm"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full text-left flex items-center justify-between p-4 font-medium text-lg hover:bg-[#F2F1EF] transition-all"
              >
                {faq.question}
                {openIndex === index ? (
                  <FaChevronUp className="text-[#B25D5D]" />
                ) : (
                  <FaChevronDown className="text-[#B25D5D]" />
                )}
              </button>
              {openIndex === index && (
                <div className="p-4 pt-0 text-sm text-[#3E3E3E]">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
