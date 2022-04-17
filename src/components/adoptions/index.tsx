import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import DogItem from "../dogitem"
import { AppState } from '../../redux/store';
import Pagination from "react-js-pagination";
import Select from 'react-select';

const Adoptions: React.FC = () => {
    const dogData = useSelector((state: AppState) => state.DogData.dogList)
    const finalData = dogData.filter(item => item.isSubmitted === true && item.isAdopted === true)
    const num = finalData.length
    const [ activePage, setActivePage ] = useState<number>(1)
    const [ activecountperpage, setActiveCountPage ] = useState<number>(12)
    const indexOfLastItem = activePage * activecountperpage
    const indexOfFirstItem = indexOfLastItem - activecountperpage
    const pageData = finalData.slice(indexOfFirstItem, indexOfLastItem)
    const handlePageChange = (pageNumber: number) => {
      setActivePage(pageNumber)
    }
    const Dogs = useMemo(()=> {
      return (
        pageData
        .map((item: any) => <DogItem key={item.id} id={item.id} img={item.url} title={item.title} />
        )
      )
    }, [pageData])
    const options = [
      { value: 10, label: 10 },
      { value: 20, label: 20 },
      { value: 50, label: 50 }
    ]
    const handleChange = (e:any) => {
      setActiveCountPage(e.value)
    }
    
    return (
      <>
        <div className="content-wrapper">
          { num > 0 ? (
            <>
              <h3>Your companions!</h3>
              { Dogs }
            </>
          ) : ''}
        </div>
        { finalData.length !== 0 ? (
          <>
            <Pagination 
              activePage={activePage}
              itemsCountPerPage={activecountperpage}
              totalItemsCount={finalData.length}
              pageRangeDisplayed={1}
              onChange={handlePageChange}
            />
            <Select options={options}  defaultValue={options[0]} onChange={handleChange} />
          </>
        ) : ''}
      </>
    )
}

export default Adoptions;