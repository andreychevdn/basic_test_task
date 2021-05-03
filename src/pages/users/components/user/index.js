import {useState, useContext} from "react";
import { NavLink } from "react-router-dom";

import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import {fetchReposCountUser} from "../../../../api/rest/reposUser";
import {USERS_URL} from "../../../../api/constants";
import {AlertContext} from "../../../../components/alert/alertContext";
import {AppAlert} from "../../../../components/alert";
import {USER_INFO} from "../../../../router/constants";



export const User = ({login, avatar}) => {
        const [reposCount, setReposCount] = useState(null); 
        const [isloading, setIsLoading] = useState(false);   
        const {alert, initialAlert, setAlert} = useContext(AlertContext);

        const getReposCountHandler = async (login) => {
            try {
                setIsLoading(true);
                const {public_repos} = await fetchReposCountUser(USERS_URL,login);
                setReposCount(public_repos);
            } catch (e) {
                setAlert({
                    text: e.message,
                    isVisible: true 
                });
                setTimeout(() => {
                    setAlert(initialAlert);
                }, 3500);
            } finally {
                setIsLoading(false);
            }
        
    }
    const hideReposCountHandler = () => setReposCount(null);


    
    return (
        <>
            <TableCell>
                <Avatar variant='square' alt={login} src={avatar}/>
            </TableCell>
            
            <TableCell>
                <NavLink to={`${USER_INFO}/${login}`}>
                    <Typography>
                        {login}
                    </Typography>
                </NavLink>
            </TableCell>
            <TableCell align="center">
            {alert.isVisible ? <AppAlert/> : null}
                <Button
                    variant="outlined"
                    style={{fontSize: '11px', padding: '5px 5px'}}
                    onClick={reposCount === null ? () => getReposCountHandler(login) : hideReposCountHandler}
                >
                  {reposCount !== null ? 'Hide Repos count' : 'Show Repos count'}
                </Button> 
            </TableCell>
            <TableCell  align="center" style={{fontWeight: 'bold', minWidth: '65px', padding: 0}}>
                {isloading ? <CircularProgress/> : reposCount}
            </TableCell>
        </>
    );
};



