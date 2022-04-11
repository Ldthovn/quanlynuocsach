import styled from 'styled-components'
import { Modal } from 'antd'
import { blue } from '../../color'

export const ModalBody = styled.div`


  .title-select {
    margin: 10px -24px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title-item {
      padding: 6px 0;
      flex: 0 0 calc(50% - 2px);
      text-align: center;
      background-color: ${blue};
      font-size: 16px;
      font-weight: 500;
      color: #fff;
    }
  }

  .modal-body {
  }

  .list-box {
    max-height: 140px;
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    border-bottom: 1px solid #f0f0f0;
    background: #ffffff;
    margin: 0 -24px 10px;
    padding: 15px 24px;
  }

  .tag-selected {
    border-radius: 35px;
    padding: 3px 8px 3px 4px;
    display: flex;
    margin-right: 0;
    align-items: center;
  }


`

export const ModalWrapper = styled(Modal)`
  .ant-modal-body {
    padding: 0 24px 15px;
  }

  .ant-modal-header {
    padding: 10px 24px;
  }

`