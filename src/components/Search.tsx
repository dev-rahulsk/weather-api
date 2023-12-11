import React, { useEffect, useState } from 'react';

const Search = ({onSearchChange}: any) => {
  const [inputValue, setInputValue] = useState("")
  const [search, setSearch] = useState(inputValue);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }
  
  useEffect(() => {
    setSearch(inputValue)
  }, [inputValue])

  const handleClick = () => {
    onSearchChange(search);
  }

  return (
    <>
      <nav className="navbar">
        <div className="container-fluid justify-content-center my-3">
          <form className="d-flex" role="search">
            <input className="form-control me-2" value={inputValue} placeholder="Search for cities" aria-label="Search" onChange={handleOnChange} />
            <button className="btn btn-outline-success" type='button' onClick={handleClick}>Search</button>
          </form>
        </div>
      </nav>
    </>
  )
}

export default Search;