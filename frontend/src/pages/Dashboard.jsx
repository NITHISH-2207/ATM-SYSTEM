import { useState } from "react";
import {
    getBalance,
    deposit,
    withdraw,
} from "../services/api";

function Dashboard({ user, onLogout }) {
    const [balance, setBalance] = useState(user.balance);
    const [amount, setAmount] = useState("");

    const fetchBalance = async () => {
        try {
            const response = await getBalance(
                user.accountNumber
            );
            setBalance(response.data.balance);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeposit = async () => {
        try {
            await deposit(
                user.accountNumber,
                Number(amount)
            );

            await fetchBalance();
            setAmount("");
        } catch (error) {
            console.error(error);
        }
    };

    const handleWithdraw = async () => {
        try {
            await withdraw(
                user.accountNumber,
                Number(amount)
            );

            await fetchBalance();
            setAmount("");
        } catch {
            alert("Insufficient Balance");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-purple-700 flex items-center justify-center">
            <div className="bg-white w-[450px] p-8 rounded-2xl shadow-2xl">

                {/* Logout Button */}
                <div className="flex justify-end mb-4">
                    <button
                        onClick={onLogout}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
                    >
                        Logout
                    </button>
                </div>

                <h1 className="text-3xl font-bold text-center mb-4">
                    Welcome, {user.name}
                </h1>

                <div className="bg-indigo-50 rounded-xl p-5 mb-6 text-center">
                    <p className="text-gray-500">
                        Current Balance
                    </p>

                    <h2 className="text-4xl font-bold text-indigo-600">
                        ₹{balance}
                    </h2>
                </div>

                <button
                    onClick={fetchBalance}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg mb-4"
                >
                    Check Balance
                </button>

                <input
                    type="number"
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={handleDeposit}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
                    >
                        Deposit
                    </button>

                    <button
                        onClick={handleWithdraw}
                        className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg"
                    >
                        Withdraw
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;