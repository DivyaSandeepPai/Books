import React from "react";
import "./App.css";

class BookCategoryRow extends React.Component {
  render() {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan="4">{category}</th>
      </tr>
    );
  }
}

class BookRow extends React.Component {
  render() {
    const book = this.props.book;
    const name = book.stocked ? (
      book.name
    ) : (
      <span style={{ color: "red" }}>{book.name}</span>
    );

    return (
      <tr>
        <td>{name}</td>
        <td>{book.price}</td>
        <td>{book.publishedon}</td>
        <td>{book.author}</td>
      </tr>
    );
  }
}

class BookTable extends React.Component {
  render() {
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;
    const rows = [];
    let lastCategory = null;

    this.props.books.forEach((book) => {
      if (book.name.indexOf(filterText) === -1) {
        return;
      }
      if (inStockOnly && !book.stocked) {
        return;
      }
      if (book.category !== lastCategory) {
        rows.push(
          <BookCategoryRow category={book.category} key={book.category} />
        );
      }
      rows.push(<BookRow book={book} key={book.name} />);
      lastCategory = book.category;
    });

    return (
      <table
        align="center"
        cellSpacing="1"
        cellPadding="5"
        className="border-pink"
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Published On</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  handleInStockChange(e) {
    this.props.onInStockChange(e.target.checked);
  }

  render() {
    return (
      <form>
        <table align="center" cellPadding="5" className="border-blue">
          <tr>
            <td align="center">
              <div className="form-group">
                <label for="usr">Enter the Name of the book </label>
                <input
                  type="text"
                  className="form-control"
                  id="usr"
                  name="username"
                  placeholder="Search..."
                  value={this.props.filterText}
                  onChange={this.handleFilterTextChange}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <p>
                <div className="custom-control custom-checkbox mb-3">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck"
                    checked={this.props.inStockOnly}
                    onChange={this.handleInStockChange}
                  />
                  <label className="custom-control-label" for="customCheck">
                    Only show products in stock
                  </label>
                </div>
              </p>
            </td>
          </tr>
        </table>
      </form>
    );
  }
}

class FilterableBookTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
      inStockOnly: false,
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText,
    });
  }

  handleInStockChange(inStockOnly) {
    this.setState({
      inStockOnly: inStockOnly,
    });
  }

  render() {
    return (
      <div>
        <h1 className="header1">BOOKMART</h1>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextChange={this.handleFilterTextChange}
          onInStockChange={this.handleInStockChange}
        />
        <BookTable
          books={this.props.books}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    );
  }
}

const BOOKS = [
  {
    category: "UI Development",
    price: "290rs",
    stocked: true,
    name: "Programing in Reactjs",
    publishedon: "20th march 2018",
    author: "Sneha Sharma",
  },
  {
    category: "UI Development",
    price: "1800rs",
    stocked: false,
    name: "Programing in Angular",
    publishedon: "20th july 2018",
    author: "Nitesh varma",
  },
  {
    category: "Programing",
    price: "350rs",
    stocked: true,
    name: "Java programing",
    publishedon: "29th march 2010",
    author: "Neha Sharma",
  },
  {
    category: "Programing",
    price: "550rs",
    stocked: false,
    name: "C# programing",
    publishedon: "5th Dec 2007",
    author: "Shekhar gupta",
  },

  {
    category: "Programing",
    price: "990rs",
    stocked: true,
    name: "Nodejs",
    publishedon: "13th oct 2017",
    author: "Damini Rizvi Roy",
  },
  {
    category: "Programing",
    price: "250rs",
    stocked: true,
    name: "expressjs",
    publishedon: "22nd may 2010",
    author: "Gopika Menon",
  },
];

class App extends React.Component {
  render() {
    return <FilterableBookTable books={BOOKS} />;
  }
}
export default App;
