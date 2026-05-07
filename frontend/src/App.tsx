import { Toaster } from "sonner";
import AllRoutes from "./components/AllRoutes";

function App() {
  return (
    <>
      <AllRoutes />
      <Toaster
        position="top-center"
        richColors
        expand
        visibleToasts={4}
        toastOptions={{
          classNames: {
            toast:
              "w-[460px] rounded-3xl border border-slate-200 bg-white shadow-2xl px-6 py-5",

            title: "text-[15px] font-semibold text-slate-900",

            description: "text-sm text-slate-500 mt-1",

            actionButton:
              "!bg-red-500 hover:!bg-red-600 !text-white !rounded-xl !px-4 !h-9 !font-medium transition-all",

            cancelButton:
              "!bg-slate-100 hover:!bg-slate-200 !text-slate-700 !rounded-xl !px-4 !h-9 !font-medium transition-all",

            success: "!border-emerald-200 !bg-emerald-50",

            error: "!border-red-200 !bg-red-50",

            warning: "!border-amber-200 !bg-amber-50",

            info: "!border-violet-200 !bg-violet-50",
          },
        }}
      />
    </>
  );
}

export default App;
