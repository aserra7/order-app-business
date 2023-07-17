import React, { useEffect, useState } from 'react'
import db from '../database/firebase';
import { Badge, Button, Col, Container, Row } from 'react-bootstrap';

const Comanda = ({ selectedComanda }) => {

    const [productes, setProductes] = useState([])
    useEffect(() => {
        console.log('sha entrat a buscar procutes')
        const unsubscribe = db.collection('productes').onSnapshot((snapshot) => {
            const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })).sort((a, b) => b.id - a.id);
            setProductes(docs);
        });
        console.log('sha fet la operacio de recuperacio de productes')
        return () => unsubscribe();
    }, [])
    console.log(productes)
    const prod = selectedComanda
        ? selectedComanda.productes.map(comandaProduct => {
            const product = productes.find(item => item.id === comandaProduct.id)
            return {
                ...product,
                quantitat: comandaProduct.quantity
            }
        })
        : [];

    console.log(prod)

    const total = prod.reduce((sum, item) => {
        const subtotal = item.quantitat * item.preu;
        return sum + subtotal;
    }, 0)

    return (
        <div>
            <Container fluid='lg' className='border rounded h-75 d-flex flex-column' style={{ position: 'relative' }}>
                <div className='d-flex justify-content-between align-items-baseline mx-3 my-2  p-2 border-bottom'>
                    <h3>Comanda #{selectedComanda.id}</h3>
                    {selectedComanda.estat === 'apunt' ? (
                        <Badge className='text-center' bg='primary'>
                            <h5 className='m-0 '>A punt</h5>
                        </Badge>
                    ) : selectedComanda.estat === 'completat' ? (
                        <Badge className='text-center' bg='success' text='dark'>
                            <h5 className='m-0'>Completat</h5>
                        </Badge>
                    ) : selectedComanda.estat === 'pendent' ? (
                        <Badge className='text-center' bg='warning' text='dark'>
                            <h5 className='m-0'>Pendent...</h5>
                        </Badge>
                    ) : <Badge className='text-center' bg='danger' text='dark'>
                        <h5 className='m-0'>No sha pogut obtenir</h5>
                    </Badge>

                    }
                </div>

                <div className='flex-grow-1 mt-2' style={{ overflowY: 'auto' }}>
                    <Row className='d-flex justify-content-between align-items-baseline mx-2 px-1 border-bottom'>
                        <Col xs={2} className='d-flex justify-content-center'><h5>Quantitat</h5></Col>
                        <Col className='d-flex justify-content-center'><h5>Item</h5></Col>
                        <Col className='d-flex justify-content-center'><h5>Preu unitat</h5></Col>
                        <Col xs={2} className='d-flex justify-content-center'><h5>Total</h5></Col>
                    </Row>
                    {prod.map(item => (
                        <Row className='mx-2 p-1 mt-1 border-bottom'>
                            <Col xs={2} className='d-flex justify-content-center'> <span>{item.quantitat}</span></Col>
                            <Col className='d-flex justify-content-center'><span>{item.nom}</span></Col>
                            <Col className='d-flex justify-content-center'><span>{item.preu?.toFixed(2)} €</span></Col>
                            <Col xs={2} className='d-flex justify-content-center'><span>{(item.quantitat * item.preu).toFixed(2)} €</span></Col>
                        </Row>
                    ))}

                </div>
                <div className='border-top py-2'>
                    <div className='d-flex justify-content-between mx-4 border-bottom'>
                        <h4>Total</h4><h4>{total.toFixed(2)}€</h4>
                    </div>
                    <div className='mt-2 d-flex justify-content-between'>
                        <div>
                            <Button className='btn-danger'>Anterior</Button><Button className='btn-success'>Següent</Button>
                        </div>
                        <div>
                            <Button className='btn-primary'>A punt</Button><Button className='btn-success'>Completar</Button>
                        </div>

                    </div>

                </div>
            </Container>
        </div>

    )
}
export default Comanda;