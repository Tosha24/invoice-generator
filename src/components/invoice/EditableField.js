import React from 'react';
import clsx from 'clsx';

class EditableField extends React.Component {
  render() {
    return (
      <div className="my-1 flex flex-nowrap group">
        {
          this.props.cellData.leading != null &&
          <div
            className="bg-borderColor font-bold border-0 rounded-l-lg text-secondary px-2 flex items-center justify-center">
            <span className="border border-secondary rounded-circle d-flex align-items-center justify-content-center small" style={{width: '20px', height: '20px'}}>
              {this.props.cellData.leading}
            </span>
          </div>
        }
        <input
          className={clsx(`w-full border p-[6px] text-md rounded-lg`,
          `${this.props.cellData.textAlign}`,
          this.props.cellData.leading != null && "rounded-none rounded-r-lg")}
          type={this.props.cellData.type}
          placeholder={this.props.cellData.placeholder}
          min={this.props.cellData.min}
          name={this.props.cellData.name}
          id={this.props.cellData.id}
          value={this.props.cellData.value}
          step={this.props.cellData.step}
          presicion={this.props.cellData.presicion}
          aria-label={this.props.cellData.name}
          onChange={this.props.onItemizedItemEdit}
          required
        />
      </div>
    );
  }
}

export default EditableField;
