import React from 'react';
import  { useState, useEffect } from "react";
import InputTags from "react-input-tags-hooks";
import 'react-input-tags-hooks/build/index.css';
import Grid from '@material-ui/core/Grid';
import Tools from '../Tool/Tool'
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import { Container } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import styles from '../../assets/MenuBar'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Grow from '@material-ui/core/Grow'
import api from '../../services/api'


function MenuBar() {
  //funções 
  const [open, setOpenAdd] = useState(false)
  const [tags, setTags] = useState([])
  const [tools, setTools] = useState([])
  const [error, setError] = useState('');
  const [alertError, setAlertError] = useState(false)
  const [alertSuccess, setAlertSuccess] = useState(false)
  const [success, setSuccess] = useState('')
  const [link, setLink] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const getTags = (tags) => {
    setTags(tags);
  }

  //declarando erros
  const errorTypes = [
    "",
    "Para adicionar uma nova ferramenta é necessário preencher todos os campos!",
    "Não foi possível se conectar. Verifique sua conexão com a internet.",
    "Você não pode cadastrar uma ferramenta que já existe!",
    "Não foi possível contatar o serviço externo. Tente mais tarde.",
  ];
  
  //declarando erros
  const successTypes = [
    "",
    "Ferramenta criada com sucesso!",  
  ];
    //controladores de Dialog
    function onOpenAdd(){
        setOpenAdd(true)
    }
    
    function handleCloseRemove(){
        setOpenAdd(false)
    }

    //função que envia requisição para busca de ferramentas
    const getTools = async()=>{
      try{
          const response = await api.get('/api/get-all-tool')
          setTools(response.data.data)
      }catch(err){
        console.log(err)
      }
  }
  //função que valida formularios e coloca os dados em um array 
  const handleCadastro = async(e)=>{
    e.preventDefault();   
      const data = {
        title, 
        link,
        description,
        tags
      }
      if(!title || !link || !description || !tags){
        setError(errorTypes[1])
        console.log('erro no formulário')
      }
      addTool(data)
    }
//função que faz requisição post para adicionar ferramenta
  const addTool = async(data)=>{
    try{
      await api.post('/api/add-tool', data)
      setSuccess(successTypes[1])
    }catch{
      //verificar no backend os status de erro
      console.log('erro ao adicionar')
    }
  }
  //executando na primeira reenderização
    useEffect(() => {
      getTools()
      }, []);

//render
  return (
    <Container style={{marginTop:'5em'}}>
      <Grow
              in={true}
              style={{ transformOrigin: "0 0 0" }}
              {...{ timeout: 500 }}
            >
            <Container>
              <Grid item xs={12} sm={12} style={styles.title}>
                <h1>VUTTR</h1>
                <h3>Very Useful Tools to Remember</h3>
              </Grid>
            </Container>
      </Grow>
            <Grid 
            spacing={0}
            container
            direction="row"
            justify="space-between"
            alignItems="center">
              {/*Barra de navegação */}
              
                  <Grid item xs={6}>
                    <Grid item xs={12}>
                      <div style={styles.inputDiv}>
                              <SearchIcon style={{width:'20%', margin:'auto'}}/>
                            <input style={styles.input}/>
                      </div>
                    </Grid>
                  </Grid>
              <Grid item xs={6} style={styles.gridAdd}>
                      <Button variant="outlined" onClick={onOpenAdd} style={styles.addButton}>
                        <AddIcon style={{margin:'auto auto auto 0px'}}/>ADD
                      </Button>
              </Grid>
              
              <Grid item xs={12}>
                  <FormControlLabel control={<Switch />} label="Search in tags only"/>
              </Grid>
              {/*Items */}
                <Grid item xs={12}>
                  {tools.map((data)=>{
                    return <Tools tool={data.title}
                            description={data.description}
                            link={data.link}
                            id={data._id}
                            tag={data.tag}
                            key={data._id}/>
                  })}  
                </Grid>
                </Grid>


        {/*Dialog */}
        <Dialog  onClose={handleCloseRemove} open={open}>
            <DialogContent >
                <DialogContentText > 
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="stretch"
                  >
                    <Grid item xs={12} sm={12} style={{minWidth:'200px', margin:'1em'}}>
                    <div style={styles.dialogTitle}>
                        <AddIcon/> Add tool
                    </div>
                    </Grid>
                    <Grid item xs={12} sm={12} style={{minWidth:'200px', margin:'1em'}}>
                        <TextField id="outlined-basic" label="Tool name" variant="outlined"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} sm={12} style={{minWidth:'200px', margin:'1em'}}>
                        <TextField id="outlined-basic" label="Tool link" variant="outlined"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12} sm={12} style={{minWidth:'200px', margin:'1em'}}>
                        <TextField id="outlined-basic" label="Tool description" variant="outlined"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} sm={12} style={{width:'200px', margin:'1em'}}>
                    <InputTags
                        onTag={getTags} // return array of tags
                        tagColor='#48c774' 
                        placeHolder="Add tags"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}/>
                      <small>Press enter to confirm TAG</small>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={12} style={{display:'flex', justifyContent:'center'}}>
                    <Button variant="contained" color="primary" style={{ background:'#48c774'}} onClick={handleCadastro}>
                      Confirm
                    </Button>
                  </Grid>
                </DialogContentText>
                <DialogActions>
                </DialogActions>
            </DialogContent>
            </Dialog>

            
      </Container>
  );
}

export default MenuBar;