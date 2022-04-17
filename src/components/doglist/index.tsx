import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import DogItem from "../dogitem"
import { AppDispatch, AppState } from '../../redux/store';
import { getDogList, loadingStatus } from '../../redux/Reducer/dogListReducer';
import { Bars } from 'react-loader-spinner';
import Pagination from "react-js-pagination";
import Select from 'react-select';

const DogList: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const dogData = useSelector((state: AppState) => state.DogData.dogList)
    const filteredData = dogData.filter((item: any)=> item.isAdopted === false )
    const dataLoadingStatus = useSelector((state: AppState) => state.DogData.isLoading)
    const [ loading, setLoading ] = useState<boolean>(dataLoadingStatus)
    
    useEffect(() => {
        dogData.length == 0 && axios.get("http://localhost:8080/dogs")
        .then((res) => {
          res.data.data.forEach((item: any) => {
            item.isAdopted = false
            item.isSubmitted = false
          })
          setLoading(false)
          dispatch(getDogList(res.data.data))
        })
      }, [])

    dispatch(loadingStatus(loading))    
    const [ activePage, setActivePage ] = useState<number>(1)
    const [ activecountperpage, setActiveCountPage ] = useState<number>(10)
    const indexOfLastItem = activePage * activecountperpage
    const indexOfFirstItem = indexOfLastItem - activecountperpage
    const pageData = filteredData.slice(indexOfFirstItem, indexOfLastItem)
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
            { loading ? (
              <Bars height="100" width="100" color="grey" ariaLabel="loading-indicator" wrapperClass="content-wrapper-loadingspinner"/>
              ) : ""}
            { Dogs }
        </div>
        { filteredData.length !==0 ? (
          <>
            <Pagination 
              activePage={activePage}
              itemsCountPerPage={activecountperpage}
              totalItemsCount={filteredData.length}
              pageRangeDisplayed={1}
              onChange={handlePageChange}
            />
            <Select options={options}  defaultValue={options[0]} onChange={handleChange} />
          </>
        ):''}
      </>
    )
}

export default DogList;