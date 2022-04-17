import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DogItem from "../dogitem"
import { AppDispatch, AppState } from '../../redux/store';
import { submitAll } from '../../redux/Reducer/dogListReducer';
import { useHistory } from 'react-router-dom';
import Pagination from "react-js-pagination";
import Select from 'react-select';

const Checkout: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const checkedDogData = useSelector((state: AppState) => state.DogData.dogList).filter(item => item.isAdopted === true && item.isSubmitted === false)
    const num = checkedDogData.length
    const url = useHistory()  
    const handleSubmitAdopt = () => {
      url.push('/adoptions')
      const ids = checkedDogData.map((item) => item.id)
      dispatch(submitAll(ids))
    }
    const [ activePage, setActivePage ] = useState<number>(1)
    const [ activecountperpage, setActiveCountPage ] = useState<number>(12)  
    const indexOfLastItem = activePage * activecountperpage
    const indexOfFirstItem = indexOfLastItem - activecountperpage
    const pageData = checkedDogData.slice(indexOfFirstItem, indexOfLastItem)    
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
        <div className="content-wrapper-checkout">
          {num > 0 ? (
            <>
              <h3>Your new friends!</h3>
              { Dogs }
              <div className="submit-btn">
                <input type="button" value="SUBMIT ADOPTION!" onClick={() => handleSubmitAdopt()}/>
              </div>
            </>
          ) : ''}
        </div>
        { checkedDogData.length !== 0 ? (
          <>
            <Pagination 
              activePage={activePage}
              itemsCountPerPage={activecountperpage}
              totalItemsCount={checkedDogData.length}
              pageRangeDisplayed={1}
              onChange={handlePageChange}
            />
            <Select options={options}  defaultValue={options[0]} onChange={handleChange} />
          </>
        ):''}
      </>
    )
}

export default Checkout;