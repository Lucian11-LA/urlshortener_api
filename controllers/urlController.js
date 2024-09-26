import URL  from '../models/urlModel.js';
import { nanoid } from 'nanoid';
// Criar nova URL curta
export const createShortUrl = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL é necessária.' });
  }

  try {
    const shortCode = nanoid(6); // Gera um código único com 6 caracteres
    const newUrl = await URL.create({ originalUrl: url, shortCode });

    res.status(201).json({
      id: newUrl.id,
      url: newUrl.originalUrl,
      shortCode: newUrl.shortCode,
      createdAt: newUrl.createdAt,
      updatedAt: newUrl.updatedAt
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar a URL curta.' });
  }
};

// Recuperar URL original a partir do código curto
export const getOriginalUrl = async (req, res) => {
  const { code } = req.params;

  try {
    const url = await URL.findOne({ where: { shortCode: code } });

    if (!url) {
      return res.status(404).json({ error: 'URL não encontrada.' });
    }

    // Atualiza o contador de acessos
    url.accessCount += 1;
    await url.save();

    res.status(200).json({
      id: url.id,
      url: url.originalUrl,
      shortCode: url.shortCode,
      createdAt: url.createdAt,
      updatedAt: url.updatedAt,
      accessCount: url.accessCount
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao recuperar a URL.' });
  }
};

// Atualizar URL curta existente
export const updateShortUrl = async (req, res) => {
  const { code } = req.params;
  const { url } = req.body;

  try {
    const existingUrl = await URL.findOne({ where: { shortCode: code } });

    if (!existingUrl) {
      return res.status(404).json({ error: 'URL não encontrada.' });
    }

    existingUrl.originalUrl = url;
    await existingUrl.save();

    res.status(200).json({
      id: existingUrl.id,
      url: existingUrl.originalUrl,
      shortCode: existingUrl.shortCode,
      createdAt: existingUrl.createdAt,
      updatedAt: existingUrl.updatedAt
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar a URL.' });
  }
};

// Deletar URL curta
export const deleteShortUrl = async (req, res) => {
  const { code } = req.params;

  try {
    const url = await URL.findOne({ where: { shortCode: code } });

    if (!url) {
      return res.status(404).json({ error: 'URL não encontrada.' });
    }

    await url.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar a URL.' });
  }
};

// Obter estatísticas da URL
export const getUrlStats = async (req, res) => {
  const { code } = req.params;

  try {
    const url = await URL.findOne({ where: { shortCode: code } });

    if (!url) {
      return res.status(404).json({ error: 'URL não encontrada.' });
    }

    res.status(200).json({
      id: url.id,
      url: url.originalUrl,
      shortCode: url.shortCode,
      createdAt: url.createdAt,
      updatedAt: url.updatedAt,
      accessCount: url.accessCount
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter estatísticas da URL.' });
  }
};
