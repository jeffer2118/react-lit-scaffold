import { createComponent } from '@lit/react';
import * as React from 'react';
import { Alert } from '../conduit-components/src/components/Alerts/conduit-alert';
import { Button } from '../conduit-components/src/components/Button/conduit-button';
import { PieChart } from '../conduit-components/src/components/PieChart/pie-chart';
import { Modal } from '../conduit-components/src/components/Modal/usa-modal';
import { ConduitTable } from '../conduit-components/src/components/Table/table'

export const AlertComponent = createComponent({
  tagName: 'conduit-alert',
  elementClass: Alert,
  react: React,
});

export const ButtonComponent = createComponent({
  tagName: 'conduit-button',
  elementClass: Button,
  react: React,
});

export const PieChartComponent = createComponent({
  tagName: 'pie-chart',
  elementClass: PieChart,
  react: React,
});

export const ModalComponent = createComponent({
  tagName: 'usa-modal',
  elementClass: Modal,
  react: React,
});

export const TableComponent = createComponent({
  tagName: 'conduit-table',
  elementClass: ConduitTable,
  react: React,
});