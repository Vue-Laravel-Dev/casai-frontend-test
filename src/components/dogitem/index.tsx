import React  from 'react';
import '../../Css/styles.css'
import { addAdoption, removeAdoption } from '../../redux/Reducer/dogListReducer';
import { AppDispatch} from '../../redux/store';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

interface DogItemType {
    id: string,
    img: string,
    title: string
}

const DogItem: React.FC<DogItemType> = ({ id, img, title }) => {
    const dispatch: AppDispatch = useDispatch();

    const url = useHistory().location.pathname

    const handleAdoptClick = (id: string) => {
        dispatch(addAdoption(id))
    }

    const handleRemoveAdopt = (id: string) => {
        dispatch(removeAdoption(id))
    }

    return (
        <>
            { url === '/checkout' ? (
                <div className="dogItem-checkout">
                    <div>
                        <img src={img} alt={title} />
                    </div>
                    <div className="dogItem-checkout-content">
                        <div className="dogItem-checkout-title">
                            {title}
                        </div>
                        <div className="dogItem-checkout-btn">
                            <input type="button" value="REMOVE FROM BASKET" onClick={() => handleRemoveAdopt(id)} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="dogItem">
                    <div className="dogItem-img">
                        <img src={img} alt={title} />
                    </div>
                    <div className="dogItem-content">
                        <div className="dogItem-title">
                            {title}
                        </div>
                        { url !== '/adoptions' ? (
                            <>
                                <hr/>
                                <div className="dogItem-btn">
                                    <input type="button" value="Adopt" onClick={() => handleAdoptClick(id)} />
                                </div>
                            </>
                        ): ''}
                    </div>
                </div>
            )}
        </>
    )
}

export default DogItem;