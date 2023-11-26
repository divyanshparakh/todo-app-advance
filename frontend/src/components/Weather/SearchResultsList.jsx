import React from 'react';

export const SearchResultsList = ({results, handleResultClick}) => {

    return (
        <div className="results-list">
            {
                results.map((result) => {
                    return <div className='search-location-result' onClick={() => handleResultClick(result)} key={result.id}>
                        <p>{result.name}, {result.region}</p><p>{result.country}</p>
                    </div>;
                })
            }
        </div>
    );
}
