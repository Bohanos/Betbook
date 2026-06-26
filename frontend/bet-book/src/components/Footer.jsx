export default function Footer() {
  return (
    <footer className="text-center p-8 text-slate-500 text-sm border-t mt-10">
      &copy; {new Date().getFullYear()} BetBook. All rights reserved.
    </footer>
  );
}