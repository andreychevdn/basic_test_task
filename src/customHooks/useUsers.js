import {useState, useEffect, useContext} from "react";

import {useDebounce} from "./useDebounce";
import {SEARCH_USERS_URL} from "../api/constants";
import {getSearchUsers} from "../api/rest/searchUsers";
import { AlertContext } from "../components/alert/alertContext";

export const useUsers = (searcherValue) => {
    const [data, setData] = useState([]);
    const [numberUsers, setNumberUsers] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const {alert, initialAlert, setAlert} = useContext(AlertContext);
    const debouncedSearcherValue = useDebounce(searcherValue, 500);

    
    useEffect(() => {
        const getUsers = async () => {
            if (debouncedSearcherValue) {
                try {
                    setIsLoading(true);
                    const {items,total_count} = await getSearchUsers(SEARCH_USERS_URL, debouncedSearcherValue);
                    console.log(items);
                    setData(items);
                    setNumberUsers(total_count);
                } catch (e) {
                    setAlert({
                        text: e.message,
                        isVisible: true 
                    });
                    setTimeout(() => {
                        setAlert(initialAlert);
                    }, 3500);
                    setData([]);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setData([]);
            }
            
        };
         getUsers();
    },[debouncedSearcherValue]);

    return {
        data,
        numberUsers,
        isLoading,
        alert
    }
};