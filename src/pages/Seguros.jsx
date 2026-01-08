import { useState, useEffect, useRef } from 'react';
import { 
  FaCar, FaFileAlt, FaCalendarAlt, FaPhone, FaUser, 
  FaCheck, FaTimes, FaSync, FaSearch, FaChevronLeft, 
  FaChevronRight, FaFilter, FaEdit, FaInfoCircle,
  FaPlus, FaSave, FaTimesCircle, FaPrint, FaIdCard,
  FaMapMarkerAlt, FaEnvelope, FaToolbox, FaCog, FaMoneyBillAlt,
  FaDownload
} from 'react-icons/fa';

// Dados fictícios de seguros com a nova estrutura completa e consistente
const segurosExemplo = [
  {
    id: 1,
    numero: '1754039430144001',
    data: '2025-08-01',
    estado: 'Aprovado',
    sincronizado: true,
    detalhesPessoais: {
      nomeCompleto: 'Antonio Elton',
      dataNascimento: '01/08/2000',
      nacionalidade: 'Mocambicano',
      tipoDocumento: 'ID',
      numeroDocumento: '122789996J',
      telefone: '845625067',
      email: 'antonioelton@gmail.com',
      actividade: 'IT',
      endereco: 'Jardim',
      fotosDocumento: {
        frente: 'https://placehold.co/400x250/E9D5FF/7C3AED?text=Documento+Frente',
        tras: 'https://placehold.co/400x250/E9D5FF/7C3AED?text=Documento+Traseiro',
      },
    },
    detalhesSeguro: {
      numero: '1754039430144001',
      status: 'Pago',
      data: '01/08/2025',
      tipoSeguro: 'Third parties with occupants',
      frequencia: 'Annual',
      dataInicio: '01/08/2025',
      dataFim: '01/08/2026',
      metodoPagamento: 'NUMERARIO',
      valorPago: '1500 MZN',
    },
    detalhesVeiculo: {
      marca: 'Toyota',
      modelo: 'BMW',
      anoFabrico: '2015',
      numeroRegisto: 'AJZ 123',
      numeroChassis: '4458',
      numeroMotor: '5789',
      tipoVeiculo: 'Light',
      tipoActividade: 'Particular',
      fotosVeiculo: [
        'https://placehold.co/150x100/FEE2E2/EF4444?text=Photo+01',
        'https://placehold.co/150x100/FCE7F3/EC4899?text=Photo+11',
        'https://placehold.co/150x100/DBEAFE/3B82F6?text=Photo+21',
        'https://placehold.co/150x100/D1FAE5/10B981?text=Photo+31',
        'https://placehold.co/150x100/FFFBEB/F59E0B?text=Photo+41',
      ],
      descricao: '',
    },
    detalhesConta: {
      funcao: 'CUSTOMER',
      usuario: 'antonioelton@gmail.com',
    },
  },
  {
    id: 2,
    numero: '1751916012519005',
    data: '2025-07-07',
    estado: 'Aprovado',
    sincronizado: true,
    detalhesPessoais: {
      nomeCompleto: 'Mario Brito',
      dataNascimento: '15/05/1995',
      nacionalidade: 'Mocambicano',
      tipoDocumento: 'BI',
      numeroDocumento: '987654321',
      telefone: '858487521',
      email: 'mariobrito@email.com',
      actividade: 'Engenheiro',
      endereco: 'Bairro Central',
      fotosDocumento: {
        frente: 'https://placehold.co/400x250/F0F4C3/8BC34A?text=Documento+Frente',
        tras: 'https://placehold.co/400x250/F0F4C3/8BC34A?text=Documento+Traseiro',
      },
    },
    detalhesSeguro: {
      numero: '1751916012519005',
      status: 'Pago',
      data: '07/07/2025',
      tipoSeguro: 'Third parties without occupants',
      frequencia: 'Semestral',
      dataInicio: '07/07/2025',
      dataFim: '07/01/2026',
      metodoPagamento: 'Transferência',
      valorPago: '1000 MZN',
    },
    detalhesVeiculo: {
      marca: 'Mazda',
      modelo: 'Demio',
      anoFabrico: '2018',
      numeroRegisto: 'AAG564MC',
      numeroChassis: '9876',
      numeroMotor: '5432',
      tipoVeiculo: 'Light',
      tipoActividade: 'Particular',
      fotosVeiculo: [
        'https://placehold.co/150x100/C8E6C9/4CAF50?text=Photo+02',
        'https://placehold.co/150x100/A5D6A7/8BC34A?text=Photo+12',
      ],
      descricao: 'Veículo em bom estado de conservação.',
    },
    detalhesConta: {
      funcao: 'CUSTOMER',
      usuario: 'mariobrito@email.com',
    },
  },
  {
    id: 3,
    numero: '1751916299933006',
    data: '2025-07-07',
    estado: 'Sincronizado',
    sincronizado: true,
    detalhesPessoais: {
      nomeCompleto: 'Mario Brito',
      dataNascimento: '15/05/1995',
      nacionalidade: 'Mocambicano',
      tipoDocumento: 'BI',
      numeroDocumento: '987654321',
      telefone: '858487521',
      email: 'mariobrito@email.com',
      actividade: 'Engenheiro',
      endereco: 'Bairro Central',
      fotosDocumento: {
        frente: 'https://placehold.co/400x250/F0F4C3/8BC34A?text=Documento+Frente',
        tras: 'https://placehold.co/400x250/F0F4C3/8BC34A?text=Documento+Traseiro',
      },
    },
    detalhesSeguro: {
      numero: '1751916299933006',
      status: 'Pendente',
      data: '07/07/2025',
      tipoSeguro: 'Third parties without occupants',
      frequencia: 'Anual',
      dataInicio: '07/07/2025',
      dataFim: '07/07/2026',
      metodoPagamento: 'NUMERARIO',
      valorPago: '1200 MZN',
    },
    detalhesVeiculo: {
      marca: 'Toyota',
      modelo: 'Corolla',
      anoFabrico: '2020',
      numeroRegisto: 'AAT456MP',
      numeroChassis: '54321',
      numeroMotor: '67890',
      tipoVeiculo: 'Light',
      tipoActividade: 'Particular',
      fotosVeiculo: [
        'https://placehold.co/150x100/FFCCBC/FF5722?text=Photo+03',
        'https://placehold.co/150x100/FFAB91/F44336?text=Photo+13',
      ],
      descricao: 'Veículo novo.',
    },
    detalhesConta: {
      funcao: 'CUSTOMER',
      usuario: 'mariobrito@email.com',
    },
  },
  {
    id: 4,
    numero: '1751859324588003',
    data: '2025-07-07',
    estado: 'Sincronizado',
    sincronizado: true,
    detalhesPessoais: {
      nomeCompleto: 'Mariam Bila',
      dataNascimento: '12/12/1990',
      nacionalidade: 'Mocambicano',
      tipoDocumento: 'ID',
      numeroDocumento: '11223344J',
      telefone: '846134373',
      email: 'mariambila@email.com',
      actividade: 'Advogada',
      endereco: 'Polana Cimento',
      fotosDocumento: {
        frente: 'https://placehold.co/400x250/C5CAE9/3F51B5?text=Documento+Frente',
        tras: 'https://placehold.co/400x250/C5CAE9/3F51B5?text=Documento+Traseiro',
      },
    },
    detalhesSeguro: {
      numero: '1751859324588003',
      status: 'Pago',
      data: '07/07/2025',
      tipoSeguro: 'Third parties without occupants',
      frequencia: 'Anual',
      dataInicio: '07/07/2025',
      dataFim: '07/07/2026',
      metodoPagamento: 'NUMERARIO',
      valorPago: '1100 MZN',
    },
    detalhesVeiculo: {
      marca: 'Mazda',
      modelo: 'CX-5',
      anoFabrico: '2022',
      numeroRegisto: 'SDF564MC',
      numeroChassis: '987654',
      numeroMotor: '345678',
      tipoVeiculo: 'Light',
      tipoActividade: 'Particular',
      fotosVeiculo: [
        'https://placehold.co/150x100/BBDEFB/2196F3?text=Photo+04',
        'https://placehold.co/150x100/90CAF9/1976D2?text=Photo+14',
      ],
      descricao: 'SUV novo.',
    },
    detalhesConta: {
      funcao: 'CUSTOMER',
      usuario: 'mariambila@email.com',
    },
  },
  {
    id: 5,
    numero: '1751857780165001',
    data: '2025-07-07',
    estado: 'Sincronizado',
    sincronizado: true,
    detalhesPessoais: {
      nomeCompleto: 'Mauro Cossa',
      dataNascimento: '05/09/1988',
      nacionalidade: 'Mocambicano',
      tipoDocumento: 'ID',
      numeroDocumento: '99887766J',
      telefone: '846134377',
      email: 'maurocossa@email.com',
      actividade: 'Gerente',
      endereco: 'Sommershield',
      fotosDocumento: {
        frente: 'https://placehold.co/400x250/E1BEE7/9C27B0?text=Documento+Frente',
        tras: 'https://placehold.co/400x250/E1BEE7/9C27B0?text=Documento+Traseiro',
      },
    },
    detalhesSeguro: {
      numero: '1751857780165001',
      status: 'Aprovado',
      data: '07/07/2025',
      tipoSeguro: 'Third parties with occupants',
      frequencia: 'Anual',
      dataInicio: '07/07/2025',
      dataFim: '07/07/2026',
      metodoPagamento: 'NUMERARIO',
      valorPago: '1500 MZN',
    },
    detalhesVeiculo: {
      marca: 'Mazda',
      modelo: 'CX-9',
      anoFabrico: '2021',
      numeroRegisto: 'AAJ564MC',
      numeroChassis: '123456',
      numeroMotor: '789012',
      tipoVeiculo: 'Light',
      tipoActividade: 'Comercial',
      fotosVeiculo: [
        'https://placehold.co/150x100/F8BBD0/E91E63?text=Photo+05',
        'https://placehold.co/150x100/F48FB1/D81B60?text=Photo+15',
      ],
      descricao: 'Veículo para transporte de passageiros.',
    },
    detalhesConta: {
      funcao: 'CUSTOMER',
      usuario: 'maurocossa@email.com',
    },
  },
  {
    id: 6,
    numero: '1754035028160001',
    data: '2025-08-01',
    estado: 'Sincronizado',
    sincronizado: true,
    detalhesPessoais: {
      nomeCompleto: 'José Carlos',
      dataNascimento: '10/11/1985',
      nacionalidade: 'Mocambicano',
      tipoDocumento: 'ID',
      numeroDocumento: '55667788J',
      telefone: '841222222',
      email: 'josecarlos@email.com',
      actividade: 'Empresário',
      endereco: 'Costa do Sol',
      fotosDocumento: {
        frente: 'https://placehold.co/400x250/E0F2F1/00897B?text=Documento+Frente',
        tras: 'https://placehold.co/400x250/E0F2F1/00897B?text=Documento+Traseiro',
      },
    },
    detalhesSeguro: {
      numero: '1754035028160001',
      status: 'Pendente',
      data: '01/08/2025',
      tipoSeguro: 'Third parties with occupants',
      frequencia: 'Anual',
      dataInicio: '01/08/2025',
      dataFim: '01/08/2026',
      metodoPagamento: 'NUMERARIO',
      valorPago: '1800 MZN',
    },
    detalhesVeiculo: {
      marca: 'Toyota',
      modelo: 'Land Cruiser',
      anoFabrico: '2023',
      numeroRegisto: 'AZX',
      numeroChassis: '9876543',
      numeroMotor: '3456789',
      tipoVeiculo: 'Heavy',
      tipoActividade: 'Particular',
      fotosVeiculo: [
        'https://placehold.co/150x100/B2DFDB/00695C?text=Photo+06',
        'https://placehold.co/150x100/80CBC4/00796B?text=Photo+16',
      ],
      descricao: 'Veículo de luxo.',
    },
    detalhesConta: {
      funcao: 'CUSTOMER',
      usuario: 'josecarlos@email.com',
    },
  },
  {
    id: 7,
    numero: '1752564095299003',
    data: '2025-07-15',
    estado: 'Sincronizado',
    sincronizado: true,
    detalhesPessoais: {
      nomeCompleto: 'Elton Francisco',
      dataNascimento: '01/02/1992',
      nacionalidade: 'Mocambicano',
      tipoDocumento: 'ID',
      numeroDocumento: '44556677J',
      telefone: '841644089',
      email: 'eltonfrancisco@email.com',
      actividade: 'Técnico de informática',
      endereco: 'Matola',
      fotosDocumento: {
        frente: 'https://placehold.co/400x250/D1C4E9/673AB7?text=Documento+Frente',
        tras: 'https://placehold.co/400x250/D1C4E9/673AB7?text=Documento+Traseiro',
      },
    },
    detalhesSeguro: {
      numero: '1752564095299003',
      status: 'Pago',
      data: '15/07/2025',
      tipoSeguro: 'Third parties without occupants',
      frequencia: 'Semestral',
      dataInicio: '15/07/2025',
      dataFim: '15/01/2026',
      metodoPagamento: 'Transferência',
      valorPago: '1000 MZN',
    },
    detalhesVeiculo: {
      marca: 'Toyota',
      modelo: 'Vitz',
      anoFabrico: '2019',
      numeroRegisto: 'ANT209TY',
      numeroChassis: '1234567',
      numeroMotor: '8901234',
      tipoVeiculo: 'Light',
      tipoActividade: 'Particular',
      fotosVeiculo: [
        'https://placehold.co/150x100/F06292/EC407A?text=Photo+07',
        'https://placehold.co/150x100/E91E63/C2185B?text=Photo+17',
      ],
      descricao: 'Carro pequeno e económico.',
    },
    detalhesConta: {
      funcao: 'CUSTOMER',
      usuario: 'eltonfrancisco@email.com',
    },
  },
  {
    id: 8,
    numero: '1751858173476002',
    data: '2025-07-07',
    estado: 'Sincronizado',
    sincronizado: true,
    detalhesPessoais: {
      nomeCompleto: 'Mauro Cossa',
      dataNascimento: '05/09/1988',
      nacionalidade: 'Mocambicano',
      tipoDocumento: 'ID',
      numeroDocumento: '99887766J',
      telefone: '846134377',
      email: 'maurocossa@email.com',
      actividade: 'Gerente',
      endereco: 'Sommershield',
      fotosDocumento: {
        frente: 'https://placehold.co/400x250/E1BEE7/9C27B0?text=Documento+Frente',
        tras: 'https://placehold.co/400x250/E1BEE7/9C27B0?text=Documento+Traseiro',
      },
    },
    detalhesSeguro: {
      numero: '1751858173476002',
      status: 'Pendente',
      data: '07/07/2025',
      tipoSeguro: 'Third parties with occupants',
      frequencia: 'Anual',
      dataInicio: '07/07/2025',
      dataFim: '07/07/2026',
      metodoPagamento: 'NUMERARIO',
      valorPago: '1500 MZN',
    },
    detalhesVeiculo: {
      marca: 'Toyota',
      modelo: 'Hilux',
      anoFabrico: '2024',
      numeroRegisto: 'AAG334MC',
      numeroChassis: '98765432',
      numeroMotor: '12345678',
      tipoVeiculo: 'Heavy',
      tipoActividade: 'Comercial',
      fotosVeiculo: [
        'https://placehold.co/150x100/E91E63/C2185B?text=Photo+08',
        'https://placehold.co/150x100/F8BBD0/E91E63?text=Photo+18',
      ],
      descricao: 'Veículo de trabalho.',
    },
    detalhesConta: {
      funcao: 'CUSTOMER',
      usuario: 'maurocossa@email.com',
    },
  },
  {
    id: 9,
    numero: '1753552886991001',
    data: '2025-07-26',
    estado: 'Sincronizado',
    sincronizado: true,
    detalhesPessoais: {
      nomeCompleto: 'Mila Titos',
      dataNascimento: '20/03/1993',
      nacionalidade: 'Mocambicano',
      tipoDocumento: 'BI',
      numeroDocumento: '88776655J',
      telefone: '846464646',
      email: 'milatitos@email.com',
      actividade: 'Designer',
      endereco: 'Maputo',
      fotosDocumento: {
        frente: 'https://placehold.co/400x250/BBDEFB/2196F3?text=Documento+Frente',
        tras: 'https://placehold.co/400x250/BBDEFB/2196F3?text=Documento+Traseiro',
      },
    },
    detalhesSeguro: {
      numero: '1753552886991001',
      status: 'Pago',
      data: '26/07/2025',
      tipoSeguro: 'Third parties without occupants',
      frequencia: 'Trimestral',
      dataInicio: '26/07/2025',
      dataFim: '26/10/2025',
      metodoPagamento: 'NUMERARIO',
      valorPago: '500 MZN',
    },
    detalhesVeiculo: {
      marca: 'Toyota',
      modelo: 'Yaris',
      anoFabrico: '2021',
      numeroRegisto: 'AGH234MC',
      numeroChassis: '4567890',
      numeroMotor: '1234567',
      tipoVeiculo: 'Light',
      tipoActividade: 'Particular',
      fotosVeiculo: [
        'https://placehold.co/150x100/DCEDC8/8BC34A?text=Photo+09',
        'https://placehold.co/150x100/F0F4C3/CDDC39?text=Photo+19',
      ],
      descricao: 'Carro citadino.',
    },
    detalhesConta: {
      funcao: 'CUSTOMER',
      usuario: 'milatitos@email.com',
    },
  },
  {
    id: 10,
    numero: '1751860865816004',
    data: '2025-07-07',
    estado: 'Sincronizado',
    sincronizado: true,
    detalhesPessoais: {
      nomeCompleto: 'Malcom Mito',
      dataNascimento: '30/01/1998',
      nacionalidade: 'Mocambicano',
      tipoDocumento: 'ID',
      numeroDocumento: '11223344K',
      telefone: '846536251',
      email: 'malcommito@email.com',
      actividade: 'Estudante',
      endereco: 'Avenida 24 de Julho',
      fotosDocumento: {
        frente: 'https://placehold.co/400x250/F8BBD0/E91E63?text=Documento+Frente',
        tras: 'https://placehold.co/400x250/F8BBD0/E91E63?text=Documento+Traseiro',
      },
    },
    detalhesSeguro: {
      numero: '1751860865816004',
      status: 'Pago',
      data: '07/07/2025',
      tipoSeguro: 'Third parties with occupants',
      frequencia: 'Anual',
      dataInicio: '07/07/2025',
      dataFim: '07/07/2026',
      metodoPagamento: 'NUMERARIO',
      valorPago: '1500 MZN',
    },
    detalhesVeiculo: {
      marca: 'Toyota',
      modelo: 'Fortuner',
      anoFabrico: '2023',
      numeroRegisto: 'AAT453MC',
      numeroChassis: '5566778',
      numeroMotor: '8899001',
      tipoVeiculo: 'Heavy',
      tipoActividade: 'Particular',
      fotosVeiculo: [
        'https://placehold.co/150x100/E91E63/C2185B?text=Photo+10',
        'https://placehold.co/150x100/F8BBD0/E91E63?text=Photo+20',
      ],
      descricao: 'SUV de grande porte.',
    },
    detalhesConta: {
      funcao: 'CUSTOMER',
      usuario: 'malcommito@email.com',
    },
  },
  {
    id: 11,
    numero: '1754039430144002',
    data: '2025-08-02',
    estado: 'Pendente',
    sincronizado: false,
    detalhesPessoais: {
      nomeCompleto: 'Ana Silva',
      dataNascimento: '11/03/1991',
      nacionalidade: 'Mocambicana',
      tipoDocumento: 'BI',
      numeroDocumento: '77889900L',
      telefone: '845678901',
      email: 'anasilva@email.com',
      actividade: 'Arquiteta',
      endereco: 'Avenida Marginal',
      fotosDocumento: {
        frente: 'https://placehold.co/400x250/C5CAE9/3F51B5?text=Documento+Frente',
        tras: 'https://placehold.co/400x250/C5CAE9/3F51B5?text=Documento+Traseiro',
      },
    },
    detalhesSeguro: {
      numero: '1754039430144002',
      status: 'Pendente',
      data: '02/08/2025',
      tipoSeguro: 'Comprehensive',
      frequencia: 'Anual',
      dataInicio: '02/08/2025',
      dataFim: '02/08/2026',
      metodoPagamento: 'NUMERARIO',
      valorPago: '2500 MZN',
    },
    detalhesVeiculo: {
      marca: 'Nissan',
      modelo: 'Qashqai',
      anoFabrico: '2020',
      numeroRegisto: 'BGH789MC',
      numeroChassis: '1122334',
      numeroMotor: '5566778',
      tipoVeiculo: 'Light',
      tipoActividade: 'Particular',
      fotosVeiculo: [
        'https://placehold.co/150x100/E3F2FD/90CAF9?text=Photo+11',
        'https://placehold.co/150x100/BBDEFB/64B5F6?text=Photo+21',
      ],
      descricao: 'SUV confortável.',
    },
    detalhesConta: {
      funcao: 'CUSTOMER',
      usuario: 'anasilva@email.com',
    },
  },
  {
    id: 12,
    numero: '1751916012519006',
    data: '2025-07-08',
    estado: 'Aprovado',
    sincronizado: true,
    detalhesPessoais: {
      nomeCompleto: 'Carlos Mendes',
      dataNascimento: '08/07/1985',
      nacionalidade: 'Mocambicano',
      tipoDocumento: 'BI',
      numeroDocumento: '66778899M',
      telefone: '846543210',
      email: 'carlosmendes@email.com',
      actividade: 'Vendedor',
      endereco: 'Jardim',
      fotosDocumento: {
        frente: 'https://placehold.co/400x250/F8F8F8/000000?text=Documento+Frente',
        tras: 'https://placehold.co/400x250/F8F8F8/000000?text=Documento+Traseiro',
      },
    },
    detalhesSeguro: {
      numero: '1751916012519006',
      status: 'Pago',
      data: '08/07/2025',
      tipoSeguro: 'Third parties',
      frequencia: 'Mensal',
      dataInicio: '08/07/2025',
      dataFim: '08/08/2025',
      metodoPagamento: 'M-Pesa',
      valorPago: '200 MZN',
    },
    detalhesVeiculo: {
      marca: 'Honda',
      modelo: 'Civic',
      anoFabrico: '2019',
      numeroRegisto: 'CCD456MC',
      numeroChassis: '9988776',
      numeroMotor: '3344556',
      tipoVeiculo: 'Light',
      tipoActividade: 'Particular',
      fotosVeiculo: [
        'https://placehold.co/150x100/F0F4C3/CDDC39?text=Photo+12',
        'https://placehold.co/150x100/DCEDC8/8BC34A?text=Photo+22',
      ],
      descricao: 'Carro desportivo e moderno.',
    },
    detalhesConta: {
      funcao: 'CUSTOMER',
      usuario: 'carlosmendes@email.com',
    },
  },
  {
    id: 13,
    numero: '1751916299933007',
    data: '2025-07-08',
    estado: 'Cancelado',
    sincronizado: false,
    detalhesPessoais: {
      nomeCompleto: 'Beatriz Souza',
      dataNascimento: '19/04/1997',
      nacionalidade: 'Mocambicana',
      tipoDocumento: 'ID',
      numeroDocumento: '22334455P',
      telefone: '847654321',
      email: 'beatrizsouza@email.com',
      actividade: 'Estudante',
      endereco: 'Bairro da Coop',
      fotosDocumento: {
        frente: 'https://placehold.co/400x250/FFECB3/FFC107?text=Documento+Frente',
        tras: 'https://placehold.co/400x250/FFECB3/FFC107?text=Documento+Traseiro',
      },
    },
    detalhesSeguro: {
      numero: '1751916299933007',
      status: 'Cancelado',
      data: '08/07/2025',
      tipoSeguro: 'Third parties without occupants',
      frequencia: 'Anual',
      dataInicio: '08/07/2025',
      dataFim: '08/07/2026',
      metodoPagamento: 'Cartão de Crédito',
      valorPago: '0 MZN',
    },
    detalhesVeiculo: {
      marca: 'Ford',
      modelo: 'Focus',
      anoFabrico: '2018',
      numeroRegisto: 'DDE789MP',
      numeroChassis: '11223344',
      numeroMotor: '55667788',
      tipoVeiculo: 'Light',
      tipoActividade: 'Particular',
      fotosVeiculo: [
        'https://placehold.co/150x100/FFF8E1/FFC107?text=Photo+13',
        'https://placehold.co/150x100/FFECB3/FF9800?text=Photo+23',
      ],
      descricao: 'Carro compacto.',
    },
    detalhesConta: {
      funcao: 'CUSTOMER',
      usuario: 'beatrizsouza@email.com',
    },
  },
  {
    id: 14,
    numero: '1751859324588004',
    data: '2025-07-08',
    estado: 'Sincronizado',
    sincronizado: true,
    detalhesPessoais: {
      nomeCompleto: 'David Wilson',
      dataNascimento: '25/11/1980',
      nacionalidade: 'Mocambicano',
      tipoDocumento: 'ID',
      numeroDocumento: '88776655L',
      telefone: '848765432',
      email: 'davidwilson@email.com',
      actividade: 'Arquiteto',
      endereco: 'Bairro Central',
      fotosDocumento: {
        frente: 'https://placehold.co/400x250/CFD8DC/546E7A?text=Documento+Frente',
        tras: 'https://placehold.co/400x250/CFD8DC/546E7A?text=Documento+Traseiro',
      },
    },
    detalhesSeguro: {
      numero: '1751859324588004',
      status: 'Pago',
      data: '08/07/2025',
      tipoSeguro: 'Comprehensive',
      frequencia: 'Anual',
      dataInicio: '08/07/2025',
      dataFim: '08/07/2026',
      metodoPagamento: 'NUMERARIO',
      valorPago: '3000 MZN',
    },
    detalhesVeiculo: {
      marca: 'BMW',
      modelo: 'X5',
      anoFabrico: '2023',
      numeroRegisto: 'EEF123MC',
      numeroChassis: '9988775',
      numeroMotor: '2233445',
      tipoVeiculo: 'Heavy',
      tipoActividade: 'Particular',
      fotosVeiculo: [
        'https://placehold.co/150x100/ECEFF1/B0BEC5?text=Photo+14',
        'https://placehold.co/150x100/CFD8DC/90A4AE?text=Photo+24',
      ],
      descricao: 'SUV de luxo e alto desempenho.',
    },
    detalhesConta: {
      funcao: 'CUSTOMER',
      usuario: 'davidwilson@email.com',
    },
  },
  {
    id: 15,
    numero: '1751857780165002',
    data: '2025-07-08',
    estado: 'Sincronizado',
    sincronizado: true,
    detalhesPessoais: {
      nomeCompleto: 'Eva Johnson',
      dataNascimento: '14/06/1994',
      nacionalidade: 'Mocambicana',
      tipoDocumento: 'ID',
      numeroDocumento: '55667788P',
      telefone: '849876543',
      email: 'evajohnson@email.com',
      actividade: 'Médica',
      endereco: 'Matola',
      fotosDocumento: {
        frente: 'https://placehold.co/400x250/E9D5FF/7C3AED?text=Documento+Frente',
        tras: 'https://placehold.co/400x250/E9D5FF/7C3AED?text=Documento+Traseiro',
      },
    },
    detalhesSeguro: {
      numero: '1751857780165002',
      status: 'Pendente',
      data: '08/07/2025',
      tipoSeguro: 'Third parties with occupants',
      frequencia: 'Anual',
      dataInicio: '08/07/2025',
      dataFim: '08/07/2026',
      metodoPagamento: 'NUMERARIO',
      valorPago: '1500 MZN',
    },
    detalhesVeiculo: {
      marca: 'Mercedes',
      modelo: 'C-Class',
      anoFabrico: '2022',
      numeroRegisto: 'FFG456MC',
      numeroChassis: '1122336',
      numeroMotor: '7788990',
      tipoVeiculo: 'Light',
      tipoActividade: 'Particular',
      fotosVeiculo: [
        'https://placehold.co/150x100/F0F4C3/8BC34A?text=Photo+15',
        'https://placehold.co/150x100/C8E6C9/4CAF50?text=Photo+25',
      ],
      descricao: 'Sedan elegante.',
    },
    detalhesConta: {
      funcao: 'CUSTOMER',
      usuario: 'evajohnson@email.com',
    },
  },
  {
    id: 16,
    numero: '1754035028160002',
    data: '2025-08-02',
    estado: 'Aprovado',
    sincronizado: true,
    detalhesPessoais: {
      nomeCompleto: 'Fernando Lima',
      dataNascimento: '09/08/1978',
      nacionalidade: 'Mocambicano',
      tipoDocumento: 'BI',
      numeroDocumento: '99887766S',
      telefone: '840987654',
      email: 'fernandolima@email.com',
      actividade: 'Professor',
      endereco: 'Bairro da Sombrilla',
      fotosDocumento: {
        frente: 'https://placehold.co/400x250/B2DFDB/00695C?text=Documento+Frente',
        tras: 'https://placehold.co/400x250/B2DFDB/00695C?text=Documento+Traseiro',
      },
    },
    detalhesSeguro: {
      numero: '1754035028160002',
      status: 'Pago',
      data: '02/08/2025',
      tipoSeguro: 'Third parties',
      frequencia: 'Anual',
      dataInicio: '02/08/2025',
      dataFim: '02/08/2026',
      metodoPagamento: 'NUMERARIO',
      valorPago: '1000 MZN',
    },
    detalhesVeiculo: {
      marca: 'Volkswagen',
      modelo: 'Golf',
      anoFabrico: '2017',
      numeroRegisto: 'GGH789',
      numeroChassis: '5566779',
      numeroMotor: '8899002',
      tipoVeiculo: 'Light',
      tipoActividade: 'Particular',
      fotosVeiculo: [
        'https://placehold.co/150x100/DCEDC8/8BC34A?text=Photo+16',
        'https://placehold.co/150x100/F0F4C3/CDDC39?text=Photo+26',
      ],
      descricao: 'Carro popular e fiável.',
    },
    detalhesConta: {
      funcao: 'CUSTOMER',
      usuario: 'fernandolima@email.com',
    },
  },
  {
    id: 17,
    numero: '1752564095299004',
    data: '2025-07-16',
    estado: 'Sincronizado',
    sincronizado: true,
    detalhesPessoais: {
      nomeCompleto: 'Gloria Martins',
      dataNascimento: '22/10/1983',
      nacionalidade: 'Mocambicana',
      tipoDocumento: 'ID',
      numeroDocumento: '77665544J',
      telefone: '841234567',
      email: 'gloriamartins@email.com',
      actividade: 'Empresária',
      endereco: 'Malhangalene',
      fotosDocumento: {
        frente: 'https://placehold.co/400x250/FFE0B2/FF9800?text=Documento+Frente',
        tras: 'https://placehold.co/400x250/FFE0B2/FF9800?text=Documento+Traseiro',
      },
    },
    detalhesSeguro: {
      numero: '1752564095299004',
      status: 'Pendente',
      data: '16/07/2025',
      tipoSeguro: 'Third parties without occupants',
      frequencia: 'Semestral',
      dataInicio: '16/07/2025',
      dataFim: '16/01/2026',
      metodoPagamento: 'M-Pesa',
      valorPago: '900 MZN',
    },
    detalhesVeiculo: {
      marca: 'Hyundai',
      modelo: 'Tucson',
      anoFabrico: '2021',
      numeroRegisto: 'HHI012TY',
      numeroChassis: '9900112',
      numeroMotor: '3344557',
      tipoVeiculo: 'Heavy',
      tipoActividade: 'Particular',
      fotosVeiculo: [
        'https://placehold.co/150x100/F0F4C3/CDDC39?text=Photo+17',
        'https://placehold.co/150x100/DCEDC8/8BC34A?text=Photo+27',
      ],
      descricao: 'SUV confortável e espaçoso.',
    },
    detalhesConta: {
      funcao: 'CUSTOMER',
      usuario: 'gloriamartins@email.com',
    },
  },
  {
    id: 18,
    numero: '1751858173476003',
    data: '2025-07-08',
    estado: 'Pendente',
    sincronizado: false,
    detalhesPessoais: {
      nomeCompleto: 'Hugo Pereira',
      dataNascimento: '01/01/1999',
      nacionalidade: 'Mocambicano',
      tipoDocumento: 'BI',
      numeroDocumento: '55443322J',
      telefone: '842345678',
      email: 'hugopereira@email.com',
      actividade: 'Estudante',
      endereco: 'Bairro da Malanga',
      fotosDocumento: {
        frente: 'https://placehold.co/400x250/E9D5FF/7C3AED?text=Documento+Frente',
        tras: 'https://placehold.co/400x250/E9D5FF/7C3AED?text=Documento+Traseiro',
      },
    },
    detalhesSeguro: {
      numero: '1751858173476003',
      status: 'Pendente',
      data: '08/07/2025',
      tipoSeguro: 'Comprehensive',
      frequencia: 'Anual',
      dataInicio: '08/07/2025',
      dataFim: '08/07/2026',
      metodoPagamento: 'Transferência',
      valorPago: '2800 MZN',
    },
    detalhesVeiculo: {
      marca: 'Kia',
      modelo: 'Sportage',
      anoFabrico: '2022',
      numeroRegisto: 'IIJ345MC',
      numeroChassis: '7788991',
      numeroMotor: '3344558',
      tipoVeiculo: 'Light',
      tipoActividade: 'Particular',
      fotosVeiculo: [
        'https://placehold.co/150x100/E3F2FD/90CAF9?text=Photo+18',
        'https://placehold.co/150x100/BBDEFB/64B5F6?text=Photo+28',
      ],
      descricao: 'SUV de design moderno.',
    },
    detalhesConta: {
      funcao: 'CUSTOMER',
      usuario: 'hugopereira@email.com',
    },
  },
  {
    id: 19,
    numero: '1753552886991002',
    data: '2025-07-27',
    estado: 'Sincronizado',
    sincronizado: true,
    detalhesPessoais: {
      nomeCompleto: 'Isabela Santos',
      dataNascimento: '18/05/1996',
      nacionalidade: 'Mocambicana',
      tipoDocumento: 'BI',
      numeroDocumento: '33221144I',
      telefone: '843456789',
      email: 'isabelasantos@email.com',
      actividade: 'Gestora',
      endereco: 'Bairro da Polana',
      fotosDocumento: {
        frente: 'https://placehold.co/400x250/FFE0B2/FF9800?text=Documento+Frente',
        tras: 'https://placehold.co/400x250/FFE0B2/FF9800?text=Documento+Traseiro',
      },
    },
    detalhesSeguro: {
      numero: '1753552886991002',
      status: 'Pago',
      data: '27/07/2025',
      tipoSeguro: 'Third parties without occupants',
      frequencia: 'Mensal',
      dataInicio: '27/07/2025',
      dataFim: '27/08/2025',
      metodoPagamento: 'M-Pesa',
      valorPago: '200 MZN',
    },
    detalhesVeiculo: {
      marca: 'Renault',
      modelo: 'Kwid',
      anoFabrico: '2020',
      numeroRegisto: 'JJK678MC',
      numeroChassis: '5566770',
      numeroMotor: '8899003',
      tipoVeiculo: 'Light',
      tipoActividade: 'Particular',
      fotosVeiculo: [
        'https://placehold.co/150x100/E9D5FF/7C3AED?text=Photo+19',
        'https://placehold.co/150x100/F0F4C3/CDDC39?text=Photo+29',
      ],
      descricao: 'Carro citadino compacto.',
    },
    detalhesConta: {
      funcao: 'CUSTOMER',
      usuario: 'isabelasantos@email.com',
    },
  },
  {
    id: 20,
    numero: '1751860865816005',
    data: '2025-07-08',
    estado: 'Cancelado',
    sincronizado: false,
    detalhesPessoais: {
      nomeCompleto: 'João Oliveira',
      dataNascimento: '10/02/1982',
      nacionalidade: 'Mocambicano',
      tipoDocumento: 'ID',
      numeroDocumento: '11223344J',
      telefone: '844567890',
      email: 'joao.oliveira@email.com',
      actividade: 'Engenheiro',
      endereco: 'Bairro da Liberdade',
      fotosDocumento: {
        frente: 'https://placehold.co/400x250/CFD8DC/546E7A?text=Documento+Frente',
        tras: 'https://placehold.co/400x250/CFD8DC/546E7A?text=Documento+Traseiro',
      },
    },
    detalhesSeguro: {
      numero: '1751860865816005',
      status: 'Cancelado',
      data: '08/07/2025',
      tipoSeguro: 'Third parties with occupants',
      frequencia: 'Anual',
      dataInicio: '08/07/2025',
      dataFim: '08/07/2026',
      metodoPagamento: 'Cartão de Crédito',
      valorPago: '0 MZN',
    },
    detalhesVeiculo: {
      marca: 'Peugeot',
      modelo: '3008',
      anoFabrico: '2023',
      numeroRegisto: 'KKL901MC',
      numeroChassis: '9988770',
      numeroMotor: '3344559',
      tipoVeiculo: 'Heavy',
      tipoActividade: 'Particular',
      fotosVeiculo: [
        'https://placehold.co/150x100/F8BBD0/E91E63?text=Photo+20',
        'https://placehold.co/150x100/F48FB1/D81B60?text=Photo+30',
      ],
      descricao: 'SUV de luxo.',
    },
    detalhesConta: {
      funcao: 'CUSTOMER',
      usuario: 'joao.oliveira@email.com',
    },
  },
];


const Seguros = () => {
  // Estados do componente
  const [seguros, setSeguros] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [seguroSelecionado, setSeguroSelecionado] = useState(null);
  const [tabAtiva, setTabAtiva] = useState('pessoais'); // Estado para controlar a aba ativa do modal
  const [carregando, setCarregando] = useState(false);
  const tabelaRef = useRef(null);

  // Constantes para paginação
  const itensPorPagina = 10;
  
  // Efeito para simular o carregamento de dados iniciais
  useEffect(() => {
    setCarregando(true);
    setTimeout(() => {
      setSeguros(segurosExemplo);
      setCarregando(false);
    }, 1200);
  }, []);

  // Efeito para animação de entrada da tabela usando IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const rows = entry.target.querySelectorAll('tr');
          rows.forEach((row, index) => {
            row.style.setProperty('--row-index', index);
            row.classList.add('visible');
          });
        }
      });
    }, { threshold: 0.1 });

    if (tabelaRef.current) {
      observer.observe(tabelaRef.current);
    }

    return () => {
      if (tabelaRef.current) {
        observer.unobserve(tabelaRef.current);
      }
    };
  }, [seguros]);

  // Lógica de filtragem e paginação
  const segurosFiltrados = seguros.filter(seguro =>
    Object.values(seguro).some(valor =>
      typeof valor === 'string' && valor.toLowerCase().includes(filtro.toLowerCase())
    ) || (seguro.detalhesPessoais?.nomeCompleto?.toLowerCase().includes(filtro.toLowerCase())) ||
    (seguro.detalhesVeiculo?.numeroRegisto?.toLowerCase().includes(filtro.toLowerCase()))
  );

  const totalPaginas = Math.ceil(segurosFiltrados.length / itensPorPagina);
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const segurosPagina = segurosFiltrados.slice(indiceInicial, indiceInicial + itensPorPagina);

  const mudarPagina = (novaPagina) => {
    setPaginaAtual(Math.max(1, Math.min(novaPagina, totalPaginas)));
  };

  const recarregarDados = () => {
    setCarregando(true);
    setTimeout(() => {
      setSeguros(segurosExemplo);
      setPaginaAtual(1);
      setFiltro('');
      setCarregando(false);
    }, 800);
  };

  // Função para imprimir o seguro
  const imprimirSeguro = (seguro) => {
    const conteudoImpressao = `
      <div style="font-family: 'Inter', Arial, sans-serif; padding: 20px;">
        <h1 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">Detalhes do Seguro</h1>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 20px;">
          <div>
            <p><strong>Número:</strong> ${seguro.numero}</p>
            <p><strong>Data:</strong> ${seguro.data}</p>
            <p><strong>Tipo de Seguro:</strong> ${seguro.detalhesSeguro?.tipoSeguro}</p>
            <p><strong>Número de Registo:</strong> ${seguro.detalhesVeiculo?.numeroRegisto || 'N/A'}</p>
          </div>
          <div>
            <p><strong>Marca:</strong> ${seguro.detalhesVeiculo?.marca}</p>
            <p><strong>Nome do Cliente:</strong> ${seguro.detalhesPessoais?.nomeCompleto}</p>
            <p><strong>Telefone:</strong> ${seguro.detalhesPessoais?.telefone}</p>
            <p><strong>Estado:</strong> ${seguro.estado}</p>
          </div>
        </div>
        
        <div style="margin-top: 30px; font-size: 12px; color: #7f8c8d; text-align: center;">
          <p>Emitido em: ${new Date().toLocaleDateString()}</p>
        </div>
      </div>
    `;

    const janelaImpressao = window.open('', '_blank');
    janelaImpressao.document.write(conteudoImpressao);
    janelaImpressao.document.close();
    janelaImpressao.focus();
    setTimeout(() => {
      janelaImpressao.print();
      janelaImpressao.close();
    }, 500);
  };
  
  // Renderização do componente
  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8 font-inter text-gray-800">
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
        
        .titulo-principal {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 2.25rem;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 2rem;
          animation: slideInLeft 0.8s ease-out forwards;
        }
        
        .icon-titulo {
          font-size: 2.5rem;
          color: #4c51bf;
        }

        .pulse {
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        .barra-ferramentas {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1.5rem;
          animation: slideInRight 0.8s ease-out forwards;
        }

        @media (min-width: 640px) {
          .barra-ferramentas {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
        }
        
        .filtro-container {
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
          max-width: 400px;
        }
        
        .input-filtro {
          padding: 0.75rem 1rem 0.75rem 2.5rem;
          border-radius: 0.5rem;
          border: 1px solid #e2e8f0;
          width: 100%;
          transition: all 0.3s ease;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .input-filtro:focus {
          outline: none;
          border-color: #4c51bf;
          box-shadow: 0 0 0 3px rgba(76, 81, 191, 0.2);
        }
        
        .icon-filtro {
          position: absolute;
          left: 0.75rem;
          color: #a0aec0;
        }
        
        .icon-filtro-ativo {
          color: #4c51bf;
        }
        
        .botao-recargar {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background-color: #3498db;
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px rgba(52, 152, 219, 0.2);
        }
        
        .botao-recargar:hover:not(:disabled) {
          background-color: #2980b9;
          transform: translateY(-2px);
          box-shadow: 0 6px 10px rgba(52, 152, 219, 0.3);
        }
        
        .botao-recargar:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .icon-recargar {
          transition: transform 0.8s ease-in-out;
        }
        
        .girando {
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .tabela-container {
          background-color: white;
          border-radius: 0.5rem;
          overflow-x: auto;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          animation: slideInUp 0.8s ease-out forwards;
        }
        
        .tabela-seguros {
          width: 100%;
          border-collapse: collapse;
        }
        
        .tabela-seguros th, .tabela-seguros td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid #e2e8f0;
          white-space: nowrap;
        }
        
        .header-row {
          background-color: #f7fafc;
          font-weight: 600;
          color: #2d3748;
        }

        .fade-in-row {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInSlideIn 0.5s ease-out forwards;
          animation-delay: calc(var(--row-index) * 0.1s);
          transition: background-color 0.3s ease;
        }

        .fade-in-row.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .tabela-seguros tbody tr:hover {
          background-color: #edf2f7;
        }
        
        .estado-badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 0.75rem;
          text-transform: capitalize;
        }
        
        .estado-badge.aprovado, .estado-badge.pago {
          background-color: #d1fae5;
          color: #065f46;
        }
        
        .estado-badge.pendente {
          background-color: #fffbeb;
          color: #92400e;
        }
        
        .estado-badge.sincronizado {
          background-color: #e2e8f0;
          color: #4a5568;
        }

        .estado-badge.cancelado {
          background-color: #fee2e2;
          color: #991b1b;
        }
        
        .icon-success {
          color: #10b981;
        }
        
        .icon-error {
          color: #ef4444;
        }
        
        .acoes-tabela {
          display: flex;
          gap: 0.5rem;
        }
        
        .botao-acao {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.3s ease;
          border: 1px solid #e2e8f0;
          background-color: #f7fafc;
          color: #4a5568;
        }
        
        .botao-acao:hover {
          background-color: #e2e8f0;
          color: #1a202c;
          transform: translateY(-1px);
        }
        
        .botao-acao.imprimir {
          background-color: #2c3e50;
          color: white;
          border: 1px solid #2c3e50;
        }
        
        .botao-acao.imprimir:hover {
          background-color: #34495e;
        }
        
        .paginacao {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          margin-top: 2rem;
        }
        
        .botao-paginacao {
          background-color: white;
          border: 1px solid #e2e8f0;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          transition: all 0.3s ease;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .botao-paginacao:hover:not(:disabled) {
          background-color: #edf2f7;
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .botao-paginacao:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .info-paginacao {
          font-weight: 500;
          color: #4a5568;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }
        
        .modal-container-detalhes {
          background-color: white;
          border-radius: 1rem;
          max-width: 900px;
          width: 90%;
          max-height: 90vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          animation: zoomIn 0.3s ease-out;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .modal-header h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a202c;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .modal-header h2 .icon-user {
          color: #4c51bf;
        }

        .botao-fechar {
          background: none;
          border: none;
          font-size: 1.5rem;
          color: #a0aec0;
          transition: color 0.3s ease;
        }
        
        .botao-fechar:hover {
          color: #4a5568;
        }

        .modal-menu {
          display: flex;
          gap: 0.25rem;
          padding: 0.5rem 2rem;
          border-bottom: 1px solid #e2e8f0;
          flex-wrap: wrap;
        }

        .menu-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          background-color: transparent;
          color: #718096;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        
        .menu-item:hover, .menu-item.ativa {
          background-color: #e2e8f0;
          color: #1a202c;
        }

        .menu-item.ativa {
          background-color: #4c51bf;
          color: white;
        }

        .menu-item.ativa:hover {
            background-color: #3f47a6;
        }

        .modal-content-wrapper {
          padding: 2rem;
          overflow-y: auto;
          flex-grow: 1;
        }

        .tab-content {
          animation: fadeIn 0.5s ease;
        }

        .titulo-aba {
          font-size: 1.25rem;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 1.5rem;
          border-left: 4px solid #4c51bf;
          padding-left: 0.75rem;
        }
        
        .detalhes-grid {
          display: grid;
          grid-template-columns: repeat(1, minmax(0, 1fr));
          gap: 1rem;
        }
        
        @media (min-width: 640px) {
          .detalhes-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        
        .detalhe-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          padding: 1rem;
          background-color: #f7fafc;
          border-radius: 0.5rem;
        }
        
        .detalhe-label {
          font-weight: 500;
          color: #4a5568;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
        }
        
        .detalhe-valor {
          font-weight: 600;
          color: #1a202c;
        }
        
        .subtitulo-secao {
          font-size: 1rem;
          font-weight: 600;
          color: #2d3748;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
        }

        .preview-imagem {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: #f7fafc;
          border-radius: 0.5rem;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .preview-imagem img {
          max-width: 100%;
          height: auto;
          object-fit: cover;
        }

        .legenda-imagem {
          position: absolute;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.6);
          color: white;
          width: 100%;
          text-align: center;
          padding: 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          padding: 1.5rem 2rem;
          border-top: 1px solid #e2e8f0;
          background-color: #f7fafc;
        }
        
        .botao-primario {
          background-color: #4c51bf;
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          transition: background-color 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .botao-primario:hover {
          background-color: #3f47a6;
        }
        
        .botao-secundario {
          background-color: transparent;
          color: #4c51bf;
          border: 1px solid #4c51bf;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .botao-secundario:hover {
          background-color: #e2e8f0;
        }
        
        .carregando {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 200px;
        }

        .loading-wave {
          display: flex;
          gap: 0.25rem;
        }

        .loading-bar {
          width: 0.75rem;
          height: 3rem;
          background-color: #4c51bf;
          border-radius: 0.25rem;
          animation: wave 1s linear infinite;
        }

        .loading-bar:nth-child(1) {
          animation-delay: 0s;
        }
        
        .loading-bar:nth-child(2) {
          animation-delay: 0.1s;
        }
        
        .loading-bar:nth-child(3) {
          animation-delay: 0.2s;
        }
        
        .loading-bar:nth-child(4) {
          animation-delay: 0.3s;
        }
        
        .loading-bar:nth-child(5) {
          animation-delay: 0.4s;
        }

        @keyframes wave {
          0% { transform: scaleY(1); }
          50% { transform: scaleY(0.5); }
          100% { transform: scaleY(1); }
        }

        .sem-resultados {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          text-align: center;
          gap: 1rem;
          color: #718096;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes zoomIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        @keyframes fadeInSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hover-float {
            transition: transform 0.3s ease-in-out;
        }

        .hover-float:hover {
            transform: translateY(-3px);
        }
        
        `}
      </style>
      <div className="seguros-container">
        <h1 className="titulo-principal">
          <FaFileAlt className="icon-titulo pulse" /> Lista de Seguros
        </h1>

        <div className="barra-ferramentas">
          <div className="filtro-container">
            <FaSearch className="icon-filtro" />
            <input
              type="text"
              placeholder="Filtrar seguros..."
              value={filtro}
              onChange={(e) => {
                setFiltro(e.target.value);
                setPaginaAtual(1);
              }}
              className="input-filtro"
            />
            {filtro && <FaFilter className="icon-filtro-ativo animate-bounce" />}
          </div>

          <button 
            onClick={recarregarDados}
            className="botao-recargar hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            disabled={carregando}
          >
            <FaSync className={`icon-recargar ${carregando ? 'girando' : ''}`} />
            {carregando ? 'Carregando...' : 'Recarregar'}
          </button>
        </div>

        <div className="tabela-container" ref={tabelaRef}>
          {carregando ? (
            <div className="carregando">
              <div className="loading-wave">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="loading-bar" style={{ '--delay': i * 0.1 + 's' }}></div>
                ))}
              </div>
            </div>
          ) : (
            <>
              <table className="tabela-seguros">
                <thead>
                  <tr className="header-row">
                    <th>Estado</th>
                    <th>Número</th>
                    <th>Data</th>
                    <th>Tipo de Seguro</th>
                    <th>Nº Registo</th>
                    <th>Marca</th>
                    <th>Nome Cliente</th>
                    <th>Telefone</th>
                    <th>Sincronizado</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {segurosPagina.map((seguro) => (
                    <tr key={seguro.id} className="fade-in-row">
                      <td>
                        <span className={`estado-badge ${seguro.estado.toLowerCase()}`}>
                          {seguro.estado}
                        </span>
                      </td>
                      <td className="dado-tabela">{seguro.numero}</td>
                      <td className="dado-tabela">{seguro.data}</td>
                      <td className="dado-tabela">{seguro.detalhesSeguro?.tipoSeguro}</td>
                      <td className="dado-tabela">{seguro.detalhesVeiculo?.numeroRegisto || 'N/A'}</td>
                      <td className="dado-tabela">{seguro.detalhesVeiculo?.marca || 'N/A'}</td>
                      <td className="dado-tabela">{seguro.detalhesPessoais?.nomeCompleto || 'N/A'}</td>
                      <td className="dado-tabela">{seguro.detalhesPessoais?.telefone || 'N/A'}</td>
                      <td className="dado-tabela">
                        {seguro.sincronizado ? (
                          <FaCheck className="icon-success" />
                        ) : (
                          <FaTimesCircle className="icon-error" />
                        )}
                      </td>
                      <td className="acoes-tabela">
                        <button 
                          onClick={() => {
                            setSeguroSelecionado(seguro);
                            setTabAtiva('pessoais');
                          }}
                          className="botao-acao"
                        >
                          <FaInfoCircle /> Detalhes
                        </button>
                        <button 
                          onClick={() => imprimirSeguro(seguro)}
                          className="botao-acao imprimir"
                        >
                          <FaPrint /> Imprimir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {segurosPagina.length === 0 && (
                <div className="sem-resultados">
                  <img src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png" alt="Sem resultados" className="w-20" />
                  <p>Nenhum seguro encontrado com o filtro aplicado.</p>
                </div>
              )}
            </>
          )}
        </div>

        {segurosFiltrados.length > 0 && (
          <div className="paginacao">
            <button 
              onClick={() => mudarPagina(paginaAtual - 1)}
              disabled={paginaAtual === 1}
              className="botao-paginacao"
            >
              <FaChevronLeft />
            </button>

            <span className="info-paginacao">
              Página {paginaAtual} de {totalPaginas}
            </span>

            <button 
              onClick={() => mudarPagina(paginaAtual + 1)}
              disabled={paginaAtual === totalPaginas || totalPaginas === 0}
              className="botao-paginacao"
            >
              <FaChevronRight />
            </button>
          </div>
        )}

        {/* Modal de Visualização de Detalhes com Abas */}
        {seguroSelecionado && (
          <div className="modal-overlay" onClick={() => setSeguroSelecionado(null)}>
            <div className="modal-container-detalhes" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h2><FaFileAlt className="icon-user" /> Seguro {seguroSelecionado.numero}</h2>
                <button onClick={() => setSeguroSelecionado(null)} className="botao-fechar"><FaTimes /></button>
              </div>
              
              <div className="modal-menu">
                <button 
                  className={`menu-item ${tabAtiva === 'pessoais' ? 'ativa' : ''}`}
                  onClick={() => setTabAtiva('pessoais')}
                >
                  <FaUser /> Informações Pessoais
                </button>
                <button 
                  className={`menu-item ${tabAtiva === 'seguros' ? 'ativa' : ''}`}
                  onClick={() => setTabAtiva('seguros')}
                >
                  <FaFileAlt /> Seguros
                </button>
                <button 
                  className={`menu-item ${tabAtiva === 'veiculos' ? 'ativa' : ''}`}
                  onClick={() => setTabAtiva('veiculos')}
                >
                  <FaCar /> Veículos
                </button>
                <button 
                  className={`menu-item ${tabAtiva === 'conta' ? 'ativa' : ''}`}
                  onClick={() => setTabAtiva('conta')}
                >
                  <FaToolbox /> Detalhes da Conta
                </button>
              </div>

              <div className="modal-content-wrapper">
                {/* Conteúdo da aba "Informações Pessoais" */}
                {tabAtiva === 'pessoais' && (
                  <div className="tab-content">
                    <h3 className="titulo-aba">Informações Pessoais</h3>
                    <div className="detalhes-grid">
                      <div className="detalhe-item">
                        <span className="detalhe-label"><FaUser /> Nome Completo:</span>
                        <span className="detalhe-valor">{seguroSelecionado.detalhesPessoais?.nomeCompleto || 'N/A'}</span>
                      </div>
                      <div className="detalhe-item">
                        <span className="detalhe-label"><FaCalendarAlt /> Data de Nascimento:</span>
                        <span className="detalhe-valor">{seguroSelecionado.detalhesPessoais?.dataNascimento || 'N/A'}</span>
                      </div>
                      <div className="detalhe-item">
                        <span className="detalhe-label"><FaIdCard /> Nacionalidade:</span>
                        <span className="detalhe-valor">{seguroSelecionado.detalhesPessoais?.nacionalidade || 'N/A'}</span>
                      </div>
                      <div className="detalhe-item">
                        <span className="detalhe-label"><FaFileAlt /> Tipo de Documento:</span>
                        <span className="detalhe-valor">{seguroSelecionado.detalhesPessoais?.tipoDocumento || 'N/A'}</span>
                      </div>
                      <div className="detalhe-item">
                        <span className="detalhe-label"><FaIdCard /> Nº do Documento:</span>
                        <span className="detalhe-valor">{seguroSelecionado.detalhesPessoais?.numeroDocumento || 'N/A'}</span>
                      </div>
                      <div className="detalhe-item">
                        <span className="detalhe-label"><FaPhone /> Nº de Telefone:</span>
                        <span className="detalhe-valor">{seguroSelecionado.detalhesPessoais?.telefone || 'N/A'}</span>
                      </div>
                      <div className="detalhe-item">
                        <span className="detalhe-label"><FaEnvelope /> Email:</span>
                        <span className="detalhe-valor">{seguroSelecionado.detalhesPessoais?.email || 'N/A'}</span>
                      </div>
                      <div className="detalhe-item">
                        <span className="detalhe-label"><FaToolbox /> Actividade:</span>
                        <span className="detalhe-valor">{seguroSelecionado.detalhesPessoais?.actividade || 'N/A'}</span>
                      </div>
                      <div className="detalhe-item">
                        <span className="detalhe-label"><FaMapMarkerAlt /> Endereço:</span>
                        <span className="detalhe-valor">{seguroSelecionado.detalhesPessoais?.endereco || 'N/A'}</span>
                      </div>
                    </div>
                    <div className="subtitulo-secao">
                      <h4 className="subtitulo-secao">Pré-visualização dos Documentos</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        {seguroSelecionado.detalhesPessoais?.fotosDocumento?.frente && (
                          <div className="preview-imagem">
                            <img src={seguroSelecionado.detalhesPessoais.fotosDocumento.frente} alt="Documento Frente" className="w-full h-auto rounded-lg shadow-md" />
                            <p className="legenda-imagem">Frente</p>
                          </div>
                        )}
                        {seguroSelecionado.detalhesPessoais?.fotosDocumento?.tras && (
                          <div className="preview-imagem">
                            <img src={seguroSelecionado.detalhesPessoais.fotosDocumento.tras} alt="Documento Traseiro" className="w-full h-auto rounded-lg shadow-md" />
                            <p className="legenda-imagem">Traseira</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Conteúdo da aba "Seguros" */}
                {tabAtiva === 'seguros' && (
                  <div className="tab-content">
                    <h3 className="titulo-aba">Detalhes do Seguro</h3>
                    <div className="detalhes-grid">
                      <div className="detalhe-item">
                        <span className="detalhe-label"><FaFileAlt /> Número:</span>
                        <span className="detalhe-valor">{seguroSelecionado.detalhesSeguro?.numero || 'N/A'}</span>
                      </div>
                      <div className="detalhe-item">
                        <span className="detalhe-label"><FaCalendarAlt /> Data:</span>
                        <span className="detalhe-valor">{seguroSelecionado.detalhesSeguro?.data || 'N/A'}</span>
                      </div>
                      <div className="detalhe-item">
                        <span className="detalhe-label"><FaCar /> Tipo de Seguro:</span>
                        <span className="detalhe-valor">{seguroSelecionado.detalhesSeguro?.tipoSeguro || 'N/A'}</span>
                      </div>
                      <div className="detalhe-item">
                        <span className="detalhe-label"><FaCalendarAlt /> Frequência:</span>
                        <span className="detalhe-valor">{seguroSelecionado.detalhesSeguro?.frequencia || 'N/A'}</span>
                      </div>
                      <div className="detalhe-item">
                        <span className="detalhe-label"><FaCalendarAlt /> Data Início:</span>
                        <span className="detalhe-valor">{seguroSelecionado.detalhesSeguro?.dataInicio || 'N/A'}</span>
                      </div>
                      <div className="detalhe-item">
                        <span className="detalhe-label"><FaCalendarAlt /> Data Fim:</span>
                        <span className="detalhe-valor">{seguroSelecionado.detalhesSeguro?.dataFim || 'N/A'}</span>
                      </div>
                      <div className="detalhe-item">
                        <span className="detalhe-label">Status:</span>
                        <span className={`detalhe-valor estado-badge ${seguroSelecionado.detalhesSeguro?.status?.toLowerCase() || 'default'}`}>{seguroSelecionado.detalhesSeguro?.status || 'N/A'}</span>
                      </div>
                    </div>
                    <h3 className="titulo-aba mt-6">Detalhes do Pagamento</h3>
                    <div className="detalhes-grid">
                      <div className="detalhe-item">
                        <span className="detalhe-label"><FaMoneyBillAlt /> Método de Pagamento:</span>
                        <span className="detalhe-valor">{seguroSelecionado.detalhesSeguro?.metodoPagamento || 'N/A'}</span>
                      </div>
                      <div className="detalhe-item">
                        <span className="detalhe-label">Valor Pago:</span>
                        <span className="detalhe-valor">{seguroSelecionado.detalhesSeguro?.valorPago || 'N/A'}</span>
                      </div>
                      <div className="detalhe-item">
                        <span className="detalhe-label">Ficheiro:</span>
                        <button className="botao-secundario inline-flex items-center gap-2">
                          <FaDownload /> Baixar Ficheiro
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Conteúdo da aba "Veículos" */}
                {tabAtiva === 'veiculos' && (
                  <div className="tab-content">
                    <h3 className="titulo-aba">Detalhes do Veículo</h3>
                    <div className="detalhes-grid">
                      <div className="detalhe-item">
                        <span className="detalhe-label"><FaCar /> Marca:</span>
                        <span className="detalhe-valor">{seguroSelecionado.detalhesVeiculo?.marca || 'N/A'}</span>
                      </div>
                      <div className="detalhe-item">
                        <span className="detalhe-label"><FaCar /> Modelo:</span>
                        <span className="detalhe-valor">{seguroSelecionado.detalhesVeiculo?.modelo || 'N/A'}</span>
                      </div>
                      <div className="detalhe-item">
                        <span className="detalhe-label"><FaCalendarAlt /> Ano de Fabrico:</span>
                        <span className="detalhe-valor">{seguroSelecionado.detalhesVeiculo?.anoFabrico || 'N/A'}</span>
                      </div>
                      <div className="detalhe-item">
                        <span className="detalhe-label"><FaCar /> Número de Registo:</span>
                        <span className="detalhe-valor">{seguroSelecionado.detalhesVeiculo?.numeroRegisto || 'N/A'}</span>
                      </div>
                      <div className="detalhe-item">
                        <span className="detalhe-label"><FaCog /> Número de Chassis:</span>
                        <span className="detalhe-valor">{seguroSelecionado.detalhesVeiculo?.numeroChassis || 'N/A'}</span>
                      </div>
                      <div className="detalhe-item">
                        <span className="detalhe-label"><FaCog /> Número de Motor:</span>
                        <span className="detalhe-valor">{seguroSelecionado.detalhesVeiculo?.numeroMotor || 'N/A'}</span>
                      </div>
                      <div className="detalhe-item">
                        <span className="detalhe-label"><FaCar /> Tipo de Veículo:</span>
                        <span className="detalhe-valor">{seguroSelecionado.detalhesVeiculo?.tipoVeiculo || 'N/A'}</span>
                      </div>
                      <div className="detalhe-item">
                        <span className="detalhe-label"><FaToolbox /> Tipo de Actividade:</span>
                        <span className="detalhe-valor">{seguroSelecionado.detalhesVeiculo?.tipoActividade || 'N/A'}</span>
                      </div>
                    </div>
                    <h4 className="subtitulo-secao mt-6">Fotografias do Veículo</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-2">
                      {seguroSelecionado.detalhesVeiculo?.fotosVeiculo?.map((foto, index) => (
                        <div key={index} className="preview-imagem">
                          <img src={foto} alt={`Veículo Foto ${index + 1}`} className="w-full h-auto rounded-lg shadow-md" />
                          <p className="legenda-imagem">Foto {index + 1}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Conteúdo da aba "Detalhes da Conta" */}
                {tabAtiva === 'conta' && (
                  <div className="tab-content">
                    <h3 className="titulo-aba">Detalhes da Conta</h3>
                    <div className="detalhes-grid">
                      <div className="detalhe-item">
                        <span className="detalhe-label"><FaToolbox /> Função:</span>
                        <span className="detalhe-valor">{seguroSelecionado.detalhesConta?.funcao || 'N/A'}</span>
                      </div>
                      <div className="detalhe-item">
                        <span className="detalhe-label"><FaUser /> Usuário:</span>
                        <span className="detalhe-valor">{seguroSelecionado.detalhesConta?.usuario || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button onClick={() => imprimirSeguro(seguroSelecionado)} className="botao-primario">
                  <FaPrint /> Imprimir
                </button>
                <button onClick={() => setSeguroSelecionado(null)} className="botao-secundario">
                  <FaTimes /> Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Seguros;
