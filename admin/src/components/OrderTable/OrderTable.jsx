import React from 'react';

export default function OrderTable({ orders }) {
  return (
    <div className="order-table">
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {/* Table rows */}
        </tbody>
      </table>
    </div>
  );
}
