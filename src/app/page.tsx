'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaTasks, FaArrowRight } from 'react-icons/fa';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col md:flex-row">
        <aside className="w-full md:w-64 bg-white shadow-md md:min-h-screen p-4">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-purple-600">TaskFlow</h1>
          </div>
          <nav>
            <ul className="space-y-2">
              <li className="flex items-center p-2 bg-purple-600 text-white rounded-lg">
                <FaTasks className="mr-2" />
                Tarefas
              </li>
            </ul>
          </nav>
        </aside>

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto h-full flex items-center justify-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                  Bem-vindo ao TaskFlow
                </h1>
                <p className="text-xl text-gray-600 mb-6">
                  Gerencie suas tarefas de forma simples e eficiente
                </p>
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/tasks"
                  className="inline-flex items-center gap-3 bg-purple-600 text-white px-8 py-4 rounded-xl text-lg
                           hover:bg-purple-700 transition-all duration-300 shadow-lg"
                >
                  <span>Acessar Tarefas</span>
                  <FaArrowRight className="h-5 w-5" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="mt-8 text-gray-500 text-sm"
              >
                <p>Clique no botão acima para começar</p>
              </motion.div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}