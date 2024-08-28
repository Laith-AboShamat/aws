const SearchComponent = ({ search, setSearch }) => {
    return (
      <div className='search-wrapper'>
        <input
          type='text'
          placeholder='Search...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='form-control'
        />
      </div>
    );
  };
  
  export default SearchComponent;
  