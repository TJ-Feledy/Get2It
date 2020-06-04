import React, { Component } from "react";
import Downshift from "downshift";


class Category extends Component {
  constructor(props) {
    super(props);
    this.Category = [
      { type: "personal" },
      { type: "Business" }
    ];

    this.state = {
      selectedcategory: ""
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(selectedcategory) {
    this.setState({ selectedcategory: selectedcategory.type });
  }

  render() {
    return (
      <Downshift
        onChange={this.onChange}
        selectedItem={this.state.selectedcategory}
        itemToString={Category => (Category ? Category.type : "")}
      >
        {({
          isOpen,
          getToggleButtonProps,
          getItemProps,
          highlightedIndex,
          selectedItem: dsSelectedItem,
          getLabelProps
        }) => (
          <div>
            <label
              style={{ marginTop: "1rem", display: "block" }}
              {...getLabelProps()}
            >
            </label>{" "}
            <br />
            <button className="dropdown-button" {...getToggleButtonProps()}>
              {this.state.selectedcategory !== ""
                ? this.state.selectedcategory
                : "Category"}
            </button>
            <div style={{ position: "relative" }}>
              {isOpen ? (
                <div className="downshift-dropdown">
                  {this.Category.map((item, index) => (
                    <div
                      className="dropdown-item"
                      {...getItemProps({ key: index, index, item })}
                      style={{
                        backgroundColor:
                          highlightedIndex === index ? "lightgray" : "gray",
                        fontWeight: dsSelectedItem === item ? "bold" : "normal"
                      }}
                    >
                      {item.Category}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        )}
      </Downshift>
    );
  }
}

export default Category 