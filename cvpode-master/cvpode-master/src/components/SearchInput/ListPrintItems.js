import React, { Component } from "react";

class ListPrintItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPages: 0,
    };

    this.selectorRef = React.createRef(null);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ totalPages: Math.ceil(this.selectorRef.current.clientHeight / 920) });
    }, 1000);
  }

  render() {
    const today = new Date();
    const date =
      today.getDate() +
      "." +
      (today.getMonth() + 1) +
      "." +
      today.getFullYear() +
      ", " +
      today.getHours() +
      ":" +
      today.getMinutes();

    const { items } = this.props;
    const { totalPages } = this.state;

    return (
      <div style={{ padding: "24px" }} ref={this.selectorRef}>
        <div className="print-list-header">
          <div className="print-list-logo">
            <img src="/logo.jpg" alt="" />
          </div>
          {items.length !== 0 && <div className="print-list-title">Ausgewählte CPV-Codes</div>}
          {items.length === 0 && <div className="print-list-title">Noch nichts ausgewählt</div>}
        </div>
        <table>
          <thead className="report-header"></thead>
          <tbody className="report-body">
            {items.length > 0 &&
              items.map((item) => {
                return (
                  <tr key={item.code}>
                    <td>
                      <div className="print-item-code">{item.code}</div>
                      <div className="print-item-desc">{item.description}</div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
          <tfoot className="report-footer">
            <tr>
              <td>
                <div className="footer-info">
                  <div className={"page-footer"}>
                    <p>Dieses Dokument wurde erzeugt am {date} Uhr.</p>
                    <div className="report-page-number">
                      <span className="page-number">{totalPages}</span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

export default ListPrintItems;
