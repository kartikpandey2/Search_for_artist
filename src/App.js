import React, { Component } from 'react';
import Button from 'antd/lib/button';
import { Modal, Input, InputNumber } from 'antd';
import ArtistDisplay from './display';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      limit: 0,
      artistName: '',
      visible: false,
      data: []
    }
  }

  changeData = (key, value) => {
    this.setState({ [key]: value})
  }

  showModal = () => this.changeData('visible', true)

  handleCancel = () => this.changeData('visible', false)

  handleOk = async () => {
    try {
      const { artistName, limit } = this.state
      const options = { method: 'GET' }
      const response = await fetch(`https://itunes.apple.com/search?term=${artistName}&limit=${limit}`, options)
      if(response) {
        const data = await response.json()
        this.setState({
          visible: false,
          data: data.results,
          artistName: '',
          limit: 0
        })
      }
    }
    catch(err) {
      console.log(err)
    }
  }

  render() {
    return (
      this.state.data.length ? <ArtistDisplay data={this.state.data} /> :
      (<div>
        <Button type="primary" onClick={this.showModal}>
          Search for artist
        </Button>
        <Modal
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        <Input
          placeholder="Artist Name" 
          onChange={(e) => this.changeData('artistName', e.target.value)} />
        <InputNumber
          min={1}
          defaultValue={1}
          onChange={(value) => this.changeData('limit', value)} />
        </Modal>
      </div>)
    );
  }
}

export default App;
