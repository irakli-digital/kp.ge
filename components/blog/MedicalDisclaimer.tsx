import { Info } from 'lucide-react';

export default function MedicalDisclaimer() {
  return (
    <div className="mb-8 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
      <div className="flex gap-3">
        <Info className="h-5 w-5 flex-shrink-0 text-zinc-500 mt-0.5" />
        <p className="text-sm text-zinc-400 leading-relaxed">
          ამ ბლოგზე გამოქვეყნებული სტატიები ემსახურება მხოლოდ საინფორმაციო და საგანმანათლებლო მიზნებს.
          ისინი არ წარმოადგენს პროფესიონალურ სამედიცინო რჩევას, დიაგნოზს ან მკურნალობას.
          ფსიქიკურ ჯანმრთელობასთან ან სამედიცინო მდგომარეობასთან დაკავშირებული ნებისმიერი კითხვით
          ყოველთვის მიმართეთ თქვენს მკურნალ ექიმს, თერაპევტს ან სხვა კვალიფიციურ სპეციალისტს.
        </p>
      </div>
    </div>
  );
}
