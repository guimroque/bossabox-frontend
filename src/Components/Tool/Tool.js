import React from 'react';
import  { useState, useEffect } from "react";
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import styles from '../../assets/Tools'
import Dialog from '@material-ui/core/Dialog';



function Tool(props) {
    
    const [open, setOpenAdd] = useState(false)
    
    //controladores de Dialog
    function onOpenAdd(){
        setOpenAdd(true)
    }
    function handleCloseRemove(){
        setOpenAdd(false)
    }

    
    //executando na primeira reenderização
    useEffect(() => {
        
      }, []);
  return(
      <div style={{marginTop:'2em'}}>
          <Card style={styles.card}>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="flex-start">
                    <Grid item xs={8}>
                        <a href={`https://${props.link}`} target="_blank"><h3 style={styles.cardTitle}>{props.tool}</h3></a>
                    </Grid>
                    <input type='hidden' value={props._id}></input>
                    <input type='hidden' value={props.tag}></input>
                    <Grid item xs={4} style={styles.buttom}>
                        <Button onClick={onOpenAdd} >
                            <CloseIcon/> Remove
                        </Button>
                    </Grid>
            </Grid>
            <p style={styles.text}>{props.description}</p>
          </Card>


          <Dialog onClose={handleCloseRemove}  open={open} >
                <DialogContent style={styles.dialogContent}>
                    <DialogContentText style={styles.dialogText}>
                    <div style={styles.dialogTitle}>
                        <CloseIcon/> Remove Tool
                    </div>
                        Would you like to remove this tool?
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={handleCloseRemove} style={styles.dialogBtn}>
                            Cancel
                        </Button>
                        <Button onClick={handleCloseRemove} style={styles.dialogBtn}>
                            Yes, Remove
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>


            
            </div>



  );
}

export default Tool;