import React, { useState, useEffect } from "react";
import db from '../database/firebase'
import Comanda from "./Comanda";
import { Badge, Button, Col, Container, Row, Stack, Tab, Tabs } from "react-bootstrap";

const ComandaList = ({ displayList }) => {
    const [comandes, setComandes] = useState([]);
    const [selectedComanda, setSelectedComanda] = useState(null)

    const [displayContainer, setDisplayContainer] = React.useState(displayList)

    const decrementarComanda = () => {
        const selectedComandaIndex = comandes.findIndex(comanda => comanda.id === selectedComanda.id);
        const nextComandaIndex = (selectedComandaIndex + 1) % comandes.length;
        setSelectedComanda(comandes[nextComandaIndex]);
    }
    const incrementarComanda = () => {
        const selectedComandaIndex = comandes.findIndex(comanda => comanda.id === selectedComanda.id);
        const previousComandaIndex = (selectedComandaIndex - 1 + comandes.length) % comandes.length;
        setSelectedComanda(comandes[previousComandaIndex]);
    };

    const actualizarEstatComanda = (nuevoEstat) => {
        if (selectedComanda) {
            selectedComanda.estat = nuevoEstat
            db.collection('orders').doc(`order${selectedComanda.id}`).update({
                estat: nuevoEstat
            }).then(() => {
                console.log('Estado de la comanda actualizado exitosamente.');
            }).catch((error) => {
                console.error('Error al actualizar el estado de la comanda:', error);
            });
        }
    };

    useEffect(() => {
        setDisplayContainer(displayList)
    }, [displayList])


    useEffect(() => {
        const unsubscribe = db.collection('orders').onSnapshot((snapshot) => {
            const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })).sort((a, b) => b.id - a.id);
            setComandes(docs);
        });

        return () => unsubscribe();
    }, [])



    const handleComandaClick = (comanda) => {
        setSelectedComanda(comanda)
    }

    return (
        <div>
            <Row>
                {displayContainer ? (
                    <Col xs={4} >
                        <Container fluid className="border rounded" style={{ height: 'calc(80vh - 3.5rem)' }}>
                            <h4 className="px-2 py-3 border-bottom mt-1">Comandes</h4>
                            <Tabs className="d-flex overflow-x-auto flex-nowrap scrollbar-hide" style={{ overflowY: 'hidden', overflowX: 'scroll' }}>
                                <Tab eventKey='Totes' title='Totes'>
                                    <Container className="border" style={{ height: 'calc(75vh - 10rem)', overflowY: 'auto' }}>
                                        {comandes.map(comanda => (
                                            <Stack
                                                direction='horizontal'
                                                className='d-flex justify-content-between align-items-baseline border-bottom my-2 p-1'
                                                onClick={() => handleComandaClick(comanda)}
                                                key={comanda.id}
                                            >
                                                <h5 className='text-dark'>Comanda #{comanda.id}</h5>
                                                {comanda.estat === 'apunt' ? (
                                                    <Badge bg='primary' ><h6 className='m-0'>Apunt</h6></Badge>
                                                ) : comanda.estat === 'completat' ? (
                                                    <Badge bg='success' text='dark'><h6 className='m-0'>Completat</h6></Badge>
                                                ) : comanda.estat === 'pendent' ? (
                                                    <Badge bg='warning' text='dark'><h6 className='m-0'>Pendent...</h6></Badge>
                                                ) : <Badge bg='warning' text='dark'><h6 className='m-0'>Pendent...</h6></Badge>

                                                }
                                            </Stack>
                                        ))}
                                    </Container>

                                </Tab>
                                <Tab eventKey='Completades' title='completades'>
                                    <Container>

                                    </Container>
                                    {comandes.map(comanda => (
                                        comanda.estat === 'completat' ? (
                                            <Stack
                                                direction='horizontal'
                                                className='d-flex justify-content-between align-items-baseline border-bottom my-2 p-1'
                                                onClick={() => handleComandaClick(comanda)}
                                                key={comanda.id}
                                            >
                                                <h5 className='text-dark'>Comanda #{comanda.id}</h5><Badge bg='success'><h6 className='m-0'>Completat</h6></Badge>
                                            </Stack>) : ('')
                                    ))}
                                </Tab>
                                <Tab eventKey='Pendents' title='pendents'>
                                    {comandes.map(comanda => (
                                        comanda.estat === 'pendent' ? (

                                            <Stack
                                                direction='horizontal'
                                                className='d-flex justify-content-between align-items-baseline border-bottom my-2 p-1'
                                                onClick={() => handleComandaClick(comanda)}
                                                key={comanda.id}
                                            >
                                                <h5 className='text-dark'>Comanda #{comanda.id}</h5><Badge bg='warning' text='dark'><h6 className='m-0'>A punt</h6></Badge>
                                            </Stack>
                                        ) : ('')
                                    ))}
                                </Tab>
                                <Tab eventKey='Llestes' title='Llestes'>
                                    {comandes.map(comanda => (
                                        comanda.estat === 'apunt' ? (
                                            <Stack
                                                direction='horizontal'
                                                className='d-flex justify-content-between align-items-baseline border-bottom my-2 p-1'
                                                onClick={() => handleComandaClick(comanda)}
                                                key={comanda.id}
                                            >
                                                <h5 className='text-dark'>Comanda #{comanda.id}</h5><Badge bg='primary'><h6 className='m-0'>A punt</h6></Badge>
                                            </Stack>
                                        ) : ('')
                                    ))}
                                </Tab>

                            </Tabs>
                        </Container>
                    </Col>) : ('')
                }

                <Col className="flex-grow-1" xs={8}>
                    {selectedComanda && (
                        <div className="border rounded" style={{ height: 'calc(80vh - 3.5rem)' }}>
                            <Comanda selectedComanda={selectedComanda} />
                            <div>
                                <div className='border-top mx-2'>
                                    <div className='mt-2 d-flex justify-content-between'>
                                        <div>
                                            <Button className='btn-danger' onClick={() => decrementarComanda()}>Anterior</Button>
                                            <Button className='btn-success' onClick={() => incrementarComanda()}>Següent</Button>
                                        </div>
                                        <div>
                                            <Button className='btn-primary' onClick={() => actualizarEstatComanda('pendent')}>A punt</Button>
                                            <Button className='btn-success' onClick={() => actualizarEstatComanda('completat')}>Completar</Button>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>

                    )}
                </Col>

            </Row>
        </div >
    );
}

export default ComandaList;