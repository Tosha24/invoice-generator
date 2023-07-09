import React from "react";
import { BiTrash } from "react-icons/bi";
import EditableField from "./EditableField";

class InvoiceItem extends React.Component {
  render() {
    var onItemizedItemEdit = this.props.onItemizedItemEdit;
    var currency = this.props.currency;
    var rowDel = this.props.onRowDel;
    var itemTable = this.props.items.map(function (item, index) {
      return (
        <ItemRow
          onItemizedItemEdit={onItemizedItemEdit}
          item={item}
          onDelEvent={rowDel.bind(this)}
          key={item.id}
          index={index+1}
          currency={currency}
        />
      );
    });
    return (
      <div>
        <table>
          <thead>
            <tr className='border-t-2 border-b-2 border-gray-200'>
              <th className="py-2">No.</th>
              <th className="text-center">ITEM</th>
              <th>QTY</th>
              <th>PRICE/RATE</th>
              <th className="text-center">ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-1"></td>
            </tr>
            {itemTable}
            <tr>
              <td className="py-1"></td>
            </tr>
          </tbody>
        </table>  
        <button className="bg-primaryColor p-2 px-3 font-medium text-md text-white mt-2 rounded-lg hover:bg-hoverColor" onClick={this.props.onRowAdd}>
          Add Item
        </button>
      </div>
    );
  }
}
class ItemRow extends React.Component {
  onDelEvent() {
    this.props.onDelEvent(this.props.item);
  }
  render() {
    return (
      <>
        <tr>
          <td className='min-w-[30px]'>
            {this.props.index}.
          </td>
          <td className="w-full pr-2">
            <EditableField
              onItemizedItemEdit={this.props.onItemizedItemEdit}
              cellData={{
                type: "text",
                name: "name",
                placeholder: "Item name",
                value: this.props.item.name,
                id: this.props.item.id,
              }}
            />
          </td>
          <td className="min-w-[70px] pr-1">
            <EditableField
              onItemizedItemEdit={this.props.onItemizedItemEdit}
              cellData={{
                type: "number",
                name: "quantity",
                min: 1,
                step: "1",
                value: this.props.item.quantity,
                id: this.props.item.id,
              }}
            />
          </td>
          <td className="min-w-[130px] pr-1">
            <EditableField
              onItemizedItemEdit={this.props.onItemizedItemEdit}
              cellData={{
                leading: this.props.currency,
                type: "number",
                name: "price",
                min: 0,
                step: "0.1",
                presicion: 2,
                textAlign: "text-end",
                value: this.props.item.price,
                id: this.props.item.id,
              }}
            />
          </td>
          <td className="text-center min-w-[50px]">
            <BiTrash
              onClick={this.onDelEvent.bind(this)}
              className="h-[33px] w-[33px] p-[7.5px] mx-auto text-white mt-1 bg-red-600 rounded-lg cursor-pointer hover:-translate-y-1 duration-300"
            />
          </td>
        </tr>
        <tr className='border-b border-gray-300'>
          <td></td>
          <td className="w-full pr-2">
            <EditableField
              onItemizedItemEdit={this.props.onItemizedItemEdit}
              cellData={{
                type: "text",
                name: "description",
                placeholder: "Item description",
                value: this.props.item.description,
                id: this.props.item.id,
              }}
            />
          </td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </>
    );
  }
}

export default InvoiceItem;
