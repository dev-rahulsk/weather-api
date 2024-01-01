import React, { useEffect, useState } from 'react';

const Header = ({ onSearchChange }: any) => {
  const [inputValue, setInputValue] = useState("")
  const [search, setSearch] = useState(inputValue);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {    
    if (e.key === "Enter") {
      onSearchChange(search);
    }
  }

  const handleClick = () => {
    onSearchChange(search);
  }

  useEffect(() => {
    setSearch(inputValue)
    if (inputValue === "") {
      onSearchChange(inputValue);
    }
  }, [inputValue])

  return (
    <>
      <nav className="navbar">
        <div className="container-fluid justify-content-center my-3">
          <div className="d-flex" role="search">
            <input className="form-control me-2" value={inputValue} placeholder="Search for cities" aria-label="Search" onChange={handleOnChange} onKeyDown={handleKeyDown} />
            <button className="btn btn-outline-success" type='button' onClick={handleClick}>Search</button>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header;