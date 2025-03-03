import Discord from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()
import * as colors from 'colorette';
import fs from 'fs'
import path from 'path'

// Set the packages
export const packages = {
    Discord,
    dotenv,
    colors,
    fs,
    path
}