"use client";

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { navigationData } from '@/lib/navigation';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.2 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

const toolList = navigationData.filter(item => item.type === 'link' && item.href !== '/');

export default function HomePage() {
  return (
    <motion.div 
      className="container py-10"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          The Ultimate Web Toolkit
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Your complete suite of fast, beautiful, and easy-to-use utilities. All in one place.
        </p>
      </div>
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {toolList.map(tool => (
          <motion.div key={tool.href} variants={itemVariants} whileHover={{ scale: 1.05, y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
            <Link href={tool.href!} className="group h-full block">
              <Card className="h-full transition-all duration-300 overflow-hidden shadow-md hover:shadow-xl border-transparent hover:border-primary/20">
                <CardHeader className="flex flex-row items-center gap-3 p-4">
                  <div className="p-2 bg-muted rounded-lg"><tool.icon className="w-6 h-6 text-primary" /></div>
                  <div className="flex-1"><CardTitle className="text-base font-semibold">{tool.label}</CardTitle><CardDescription className="text-xs line-clamp-2">{tool.description}</CardDescription></div>
                </CardHeader>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}