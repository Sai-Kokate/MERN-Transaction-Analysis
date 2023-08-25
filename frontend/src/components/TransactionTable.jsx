import React from "react";

const TransactionTable = ({ transactions }) => {
  return (
    <table className="table-fixed border border-collapse">
      <thead>
        <tr className="border-2">
          <th className="border-2 p-1">S.No.</th>
          <th className="border-2 p-1">ID</th>
          <th className="border-2 p-1">Image</th>
          <th className="border-2 p-1">Title</th>
          <th className="border-2 p-1">Price (₹)</th>
          <th className="border-2 p-1">Description</th>
          <th className="border-2 p-1">Category</th>
          <th className="border-2 p-1">Sold</th>
          <th className="border-2 p-1">Date of Sale</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction, index) => (
          <tr key={transaction.id} className="border-2">
            <td className="border-2 p-1 w-8 text-center">{index + 1}</td>
            <td className="border-2 p-1 w-8 text-center ">{transaction.id}</td>
            <td className="border-2 p-1 w-60 pl-2 text-center">
              <img
                src={transaction.image}
                alt={transaction.title}
                className="text-center w-11/12 h-44"
              />
            </td>
            <td className="border-2 p-1 w-60">{transaction.title}</td>
            <td className="border-2 p-1 w-20 text-center">
              {transaction.price.toFixed(2)}
            </td>
            <td className="border-2 p-1 w-96">
              {transaction.description.slice(0, 200)}...
            </td>
            <td className="border-2 p-1 text-center ">
              {transaction.category}
            </td>
            <td className="border-2 p-1 text-center ">
              {transaction.sold ? "Yes" : "No"}
            </td>
            <td className="border-2 p-1 text-center ">
              {transaction.dateOfSale.slice(0, 10)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable;
