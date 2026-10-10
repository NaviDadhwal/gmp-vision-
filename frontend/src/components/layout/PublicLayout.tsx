import React from 'react';
import { Outlet } from 'react-router-dom';
import { CleanroomHeader } from './CleanroomHeader';
import { CleanroomFooter } from './CleanroomFooter';
import { WhatsAppFloatingAction } from '../common/WhatsAppFloatingAction';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-brand-dark">
      <CleanroomHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <CleanroomFooter />
      <WhatsAppFloatingAction />
    </div>
  );
};
