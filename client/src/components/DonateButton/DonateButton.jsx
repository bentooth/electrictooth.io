import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as web3Actions from 'redux/modules/web3';
import axios from 'axios';
import { BarLoader, HashLoader } from 'react-spinners';
import { financial } from 'lib/utils'

const ConnectContainer = styled.div`
  position: fixed;
  top: 0px;
  display: flex;
`
const Connect = styled.div`
  background-color: #F49D37;
  color: white;
  z-index: 99;
  font-size: 13px;
  padding: 5px;
  border-radius: 0 0 5px 0;
`;
const Panel = styled.div`
  position: fixed;
  top: 20px;
  display: flex;
  background-color: #F49D37;
  color: white;
  z-index: 99;
  font-size: 13px;
  left: -190px;
  transition: 0.3s;
  padding: 5px;
  border-radius: 0 5px 5px 0;
  flex-direction: column;
  width: 220px;
  height: 25px;

  &:hover {
    left: 0;
    height: 230px;
  }
`;
const BalanceContainer = styled.div`
  font-size: 12px;
  text-align: right;
  margin-bottom: 15px;
`;
const DonateContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const Button = styled.div`
  opacity: 1;
  color: rgb(255, 255, 255);
  min-height: 30px;
  font-size: 10px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(255, 255, 255, 0.35);
  border-image: initial;
  padding: 0px 8px;
  margin: 5px;
  ${({ active }) => active ? 'background-color: #09a9b3;' : 'background-color: transparent;'}

  &:hover {
    background-color: #09a9b3;
  }

`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  justify-content: center;
`;
const Rate = styled.div`
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  vertical-align: baseline;
  opacity: 0.4;
  font-size: 12px;
  color: rgb(255, 255, 255);
  font-weight: 500;
`;
const Send = styled.div`
  opacity: 0.5;
  color: rgb(255, 255, 255);
  min-height: 30px;
  font-size: 10px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(255, 255, 255, 0.35);
  border-image: initial;
  padding: 0px 8px;
  margin: 20px;

  ${({ active }) => active && 'opacity: 1'}

  &:hover {
    background-color: white;
    color: #09a9b3;
    border-color: #09a9b3
  }
`;
const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const PendingMsg = styled.div`
  margin-top: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Happy = styled.span`
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: -5px;
`;

class DonateButton extends Component {
  constructor() {
    super();
    this.state = {
      balance: null,
      rate: null,
      active: null,
      tipAmount: null
    }
  }

  getEthRate = async () => {
    try {
      let rate = await axios.get('/paybear/ethrate');
      let mid = financial(rate.data.data.mid);

      let tip1 = 0.15 / mid;
      let tip2 = 0.50 / mid;
      let tip3 = 1.00 / mid;

      this.setState({
        rate: mid,
        tip1: tip1.toFixed(4),
        tip2: tip2.toFixed(4),
        tip3: tip3.toFixed(4)
      })
    } catch (error) {
      return error;
    }
  };


  componentWillMount() {
    const { Web3Actions } = this.props;
    Web3Actions.fetchWeb3();
    Web3Actions.fetchEthereum();
  }

  connect = async () => {
    const { Web3Actions, web3, privacyMode } = this.props;

    this.setState({
      loading: true
    })

    if (privacyMode) {
      try {
        await web3.enable();
        await Web3Actions.initializeEthereum(web3);
      } catch (error) {
        console.log('Electric Tooth was denied web3 permissions!')
      }
    } else {
      await Web3Actions.initializeEthereum(window.web3);
    }

    await this.getEthRate();
    await this.balance();
  }

  balance = async () => {
    const { service, address } = this.props;

    service.eth.getBalance(address).then(async (wei) => {

      let balance = await service.utils.fromWei(wei.toString(), 'ether');
      let balance_num = financial(balance)

      this.setState({
        balance: balance_num
      });
    });
  }

  setTip = (tipAmount, active) => {
    this.setState({
      active: active,
      tipAmount: tipAmount
    })
  }

  sendTransaction = async () => {
    const { service, address } = this.props;
    const { tipAmount } = this.state;

    this.setState({ pending: true });

    try {
      const TRANSACTION = await service.eth.sendTransaction({
        from: address,  //metamask
        to: '0x866ff4209d37813cc2c46361775b960d81e6b724', //coinbase
        value: service.utils.toWei(tipAmount, 'ether'),
        gasLimit: 21000,
        gasPrice: 30000000000
      });

      const SERVER = await axios.get('/verifytip', {
        params: {
          txHash: TRANSACTION.transactionHash
        }
      });

      this.setState({
        server: { ...SERVER },
        transaction: { ...TRANSACTION },
        pending: false,
        status: 'SUCCESS'
      });

    } catch (error) {
      this.setState({
        pending: false,
        status: 'ERROR'
      });
      console.log(error);
    }
  }

  render() {
    const { error, address } = this.props;
    const { rate, balance, loading } = this.state;

    if (error) {
      return (
        <ConnectContainer>
          <Connect>{error}</Connect>
        </ConnectContainer>
      )
    }

    if (this.state.status === 'SUCCESS') {
      return (
        <Panel>
          <div>
            <LoaderContainer>
              <Happy>&#9786;</Happy>
            </LoaderContainer>
            <PendingMsg>
              <div>Thank You! {address.slice(0, 6)}</div>
            </PendingMsg>
          </div>
        </Panel>
      )
    }

    if (this.state.status === 'ERROR') {
      return (
        <Panel>
          <div>
            <LoaderContainer>
              <Happy>&#9785;</Happy>
            </LoaderContainer>
            <PendingMsg>
              <div>Transaction Failed</div>
            </PendingMsg>
          </div>
        </Panel>
      )
    }

    if (balance && rate) {
      const { tip1, tip2, tip3, active } = this.state;
      return (
        <Panel>
          {!this.state.pending
            ? <div>
              <BalanceContainer>Balance: {balance} ETH</BalanceContainer>

              <DonateContainer>

                <ButtonContainer>
                  <Button onClick={() => this.setTip(tip1, 1)} active={active === 1 ? 1 : 0}>{tip1} ETH</Button>
                  <Rate>~0.15 USD</Rate>
                </ButtonContainer>

                <ButtonContainer>
                  <Button onClick={() => this.setTip(tip2, 2)} active={active === 2 ? 1 : 0}>{tip2} ETH</Button>
                  <Rate>~0.50 USD</Rate>
                </ButtonContainer>

                <ButtonContainer>
                  <Button onClick={() => this.setTip(tip3, 3)} active={active === 3 ? 1 : 0}>{tip3} ETH</Button>
                  <Rate>~1.00 USD</Rate>
                </ButtonContainer>

                <Send active={active && true} onClick={active ? this.sendTransaction : null}>Send my tip</Send>
              </DonateContainer>
            </div>
            : <div>
              <LoaderContainer>
                <HashLoader color={'#09a9b3'} loading={this.state.pending} size={18} />
              </LoaderContainer>
              <PendingMsg>
                <HashLoader color={'#09a9b3'} loading={this.state.pending} />
                <div>Mining...</div>
              </PendingMsg>
            </div>
          }

        </Panel>
      )
    }

    if (!error) {
      return (
        <ConnectContainer>
          <Connect onClick={this.connect}>{loading ? <BarLoader color={'#09a9b3'} /> : <div>Connect w/ MetaMask</div>}</Connect>
        </ConnectContainer>
      )
    }
  }
}

export default connect(
  state => ({
    web3: state.web3.web3,
    address: state.web3.address,
    service: state.web3.service,
    privacyMode: state.web3.privacyMode,
    error: state.web3.error,
    updatedAt: state.web3.updatedAt
  }),
  dispatch => ({
    Web3Actions: bindActionCreators(web3Actions, dispatch)
  })
)(DonateButton);

/*

<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
<input type="hidden" name="cmd" value="_s-xclick" />
<input type="hidden" name="hosted_button_id" value="67W4MC3HYUXL6" />
<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
<img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
</form>

*/