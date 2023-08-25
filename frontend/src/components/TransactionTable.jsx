import React from "react";

const TransactionTable = ({ transactions }) => {
  return (
    <table className="table-fixed border border-collapse">
      <thead>
        <tr className="border-2 bg-indigo-300">
          <th className="border-2 p-1 border-gray-500">S.No.</th>
          <th className="border-2 p-1 border-gray-500">ID</th>
          <th className="border-2 p-1 border-gray-500">Image</th>
          <th className="border-2 p-1 border-gray-500">Title</th>
          <th className="border-2 p-1 border-gray-500">Price (₹)</th>
          <th className="border-2 p-1 border-gray-500">Description</th>
          <th className="border-2 p-1 border-gray-500">Category</th>
          <th className="border-2 p-1 border-gray-500">Sold</th>
          <th className="border-2 p-1 border-gray-500">Date of Sale</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction, index) => (
          <tr key={transaction.id} className="border-2">
            <td className="border-2 p-1 w-8 text-center  border-gray-500">
              {index + 1}
            </td>
            <td className="border-2 p-1 w-8 text-center  border-gray-500">
              {transaction.id}
            </td>
            <td className="border-2 p-1 w-60 pl-2 text-center  border-gray-500">
              <img
                src={transaction.image}
                alt={transaction.title}
                className="text-center w-11/12 h-44"
              />
            </td>
            <td className="border-2 p-1 w-60  border-gray-500">
              {transaction.title}
            </td>
            <td className="border-2 p-1 w-20 text-center  border-gray-500">
              {transaction.price.toFixed(2)}
            </td>
            <td className="border-2 p-1 w-96  border-gray-500">
              {transaction.description.slice(0, 200)}...
            </td>
            <td className="border-2 p-1 text-center  border-gray-500 ">
              {transaction.category}
            </td>
            <td className="border-2 p-1 text-center  border-gray-500">
              {transaction.sold ? "Yes" : "No"}
            </td>
            <td className="border-2 p-1 text-center  border-gray-500">
              {transaction.dateOfSale.slice(0, 10)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable;
