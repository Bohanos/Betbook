import BetSlip from '../components/BetSlip';

export default function MyBookings() {
  return (
    <div className="flex gap-8">
      <div className="flex-1">
        <h2 className="text-2xl font-bold">My Betting History</h2>
      </div>
      <BetSlip />
    </div>
  );
}