"use client"

import { usePathname, useRouter } from "next/navigation"
import React from "react"
import { motion } from "framer-motion"

export const SideBarItem = ({ href, title, icon }: { href: string, title: string, icon: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const selected = pathname === href

  return (
    <motion.div
      className={`flex items-center ${selected ? "text-blue-400" : "text-gray-400"} cursor-pointer p-3 rounded-lg hover:bg-gray-800 transition-colors`}
      onClick={() => {
        router.push(href);
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="pr-3"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {icon}
      </motion.div>
      <motion.div
        className={`font-medium ${selected ? "text-blue-400" : "text-gray-400"}`}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {title}
      </motion.div>
    </motion.div>
  )
}